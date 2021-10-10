import { OfficeCost } from '@modules/offices/infra/typeorm/entities/OfficeCost';
import {
  IOfficeCostsRepository,
  PeopleMonthHours,
} from '@modules/offices/repositories/IOfficeCostsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  month: number;
  year: number;
  registers: {
    personId: string;
    officeId: string;
    hours: number;
  }[];
}

@injectable()
export class RegisterCostsUseCase {
  constructor(
    @inject('OfficeCostsRepository')
    private officeCostsRepository: IOfficeCostsRepository,
  ) {}

  async execute({
    month,
    year,
    registers,
  }: IRequest): Promise<OfficeCost[] | PeopleMonthHours> {
    const monthAlreadyRegistered = await this.officeCostsRepository.getByMonth({
      month,
      year,
      officeId: registers[0]?.officeId ?? '123',
    });

    if (monthAlreadyRegistered.length > 0) {
      throw new AppError('Month costs already registered');
    }

    const formattedRegisters = registers.map((register) => ({
      person_id: register.personId,
      office_id: register.officeId,
      hours: register.hours,
      month,
      year,
    }));

    try {
      const peopleMonthHours =
        await this.officeCostsRepository.getPeopleMonthHours({
          month,
          year,
        });

      const erroredPeople: PeopleMonthHours = [];

      formattedRegisters.forEach((register) => {
        const groupedPeople = formattedRegisters.filter(
          (item) => item.person_id === register.person_id,
        );

        const sumHours = groupedPeople.reduce((prevValue, currentItem) => {
          return prevValue + currentItem.hours;
        }, 0);

        if (
          groupedPeople.length > 0 &&
          !erroredPeople.some(
            (people) => people.person_id === register.person_id,
          ) &&
          sumHours > 160
        ) {
          erroredPeople.push({
            person_id: groupedPeople[0].person_id,
            hours: sumHours,
          });
        }
      });

      formattedRegisters.map((register) => {
        const person = peopleMonthHours.find(
          (person) => person.person_id === register.person_id,
        );

        if (
          !!person &&
          Number(person.hours) + Number(register.hours) >= 160 &&
          !erroredPeople.some((item) => item.person_id === person.person_id)
        ) {
          erroredPeople.push(person);
        }
      });

      if (erroredPeople.length !== 0) {
        return erroredPeople;
      }

      const response = await Promise.all(
        formattedRegisters.map(async (data) => {
          return await this.officeCostsRepository.create(data);
        }),
      );

      return response;
    } catch (error) {
      throw new AppError('Invalid body sended');
    }
  }
}
