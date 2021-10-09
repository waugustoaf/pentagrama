import { ICreateProfessionTypeDTO } from '@modules/professionTypes/dtos/ICreateProfessionTypeDTO';
import { ProfessionType } from '@modules/professionTypes/infra/typeorm/entities/ProfessionType';
import { IProfessionTypesRepository } from '@modules/professionTypes/repositories/IProfessionTypesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';


@injectable()
export class CreateProfessionTypeUseCase {
  constructor(
    @inject('ProfessionTypesRepository')
    private professionTypesRepository: IProfessionTypesRepository,
  ) {}

  async execute(data: ICreateProfessionTypeDTO): Promise<ProfessionType> {
    const professionTypeAlreadyExits =
      await this.professionTypesRepository.findByName(data.name);

    if (professionTypeAlreadyExits) {
      throw new AppError('Profession Type already exists.');
    }

    const professionType = await this.professionTypesRepository.create(data);

    return professionType;
  }
}
