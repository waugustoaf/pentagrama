import { ICreateProfessionTypeDTO } from '@modules/professionTypes/dtos/ICreateProfessionTypeDTO';
import { ProfessionType } from '../infra/typeorm/entities/ProfessionType';

export interface IProfessionTypesRepository {
  create(data: ICreateProfessionTypeDTO): Promise<ProfessionType>;
  findByName(name: string): Promise<ProfessionType | undefined>;
  findById(id: string): Promise<ProfessionType | undefined>;
  delete(professionTypeId: string): Promise<void>;
  list(): Promise<ProfessionType[]>;
}
