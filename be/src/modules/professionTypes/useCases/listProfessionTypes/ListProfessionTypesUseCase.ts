import { ProfessionType } from '@modules/professionTypes/infra/typeorm/entities/ProfessionType';
import { IProfessionTypesRepository } from '@modules/professionTypes/repositories/IProfessionTypesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProfessionTypesUseCase {
  constructor(
    @inject('ProfessionTypesRepository')
    private professionTypesRepository: IProfessionTypesRepository,
  ) {}

  async execute(): Promise<ProfessionType[]> {
    const professionTypes = await this.professionTypesRepository.list();

    return professionTypes;
  }
}
