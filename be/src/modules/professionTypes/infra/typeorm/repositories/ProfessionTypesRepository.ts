import { ICreateProfessionTypeDTO } from '@modules/professionTypes/dtos/ICreateProfessionTypeDTO';
import { IProfessionTypesRepository } from '@modules/professionTypes/repositories/IProfessionTypesRepository';
import { getRepository, Repository } from 'typeorm';
import { ProfessionType } from '../entities/ProfessionType';

export class ProfessionTypesRepository implements IProfessionTypesRepository {
  private repository: Repository<ProfessionType>;

  constructor() {
    this.repository = getRepository(ProfessionType);
  }

  async create(data: ICreateProfessionTypeDTO): Promise<ProfessionType> {
    const professionType = this.repository.create(data);

    await this.repository.save(professionType);

    return professionType;
  }

  async findByName(name: string): Promise<ProfessionType | undefined> {
    const professionType = await this.repository.findOne({ where: { name } });

    return professionType;
  }

  async findById(id: string): Promise<ProfessionType | undefined> {
    const professionType = await this.repository.findOne(id);

    return professionType;
  }

  async delete(professionTypeId: string): Promise<void> {
    await this.repository.delete(professionTypeId);
  }

  async list(): Promise<ProfessionType[]> {
    return this.repository.find();
  }
}
