import { ICreatePersonDTO } from '@modules/people/dtos/ICreatePersonDTO';
import { IPeopleRepository } from '@modules/people/infra/repositories/IPeopleRepository';
import { isValidCPF } from '@modules/people/utils/isValidCPF';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

@injectable()
export class CreatePersonUseCase {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute(data: ICreatePersonDTO) {
    if (!validate(data.profession_type_id)) {
      throw new AppError('Invalid Profession Type ID');
    }

    if (!isValidCPF(data.cpf)) {
      throw new AppError('Invalid CPF number');
    }

    const personAlreadyExists = await this.peopleRepository.findByCPF(data.cpf);

    if (personAlreadyExists) {
      throw new AppError('Person already exists.');
    }

    const person = await this.peopleRepository.create(data);

    return person;
  }
}
