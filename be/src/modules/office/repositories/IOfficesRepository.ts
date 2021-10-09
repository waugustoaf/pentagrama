import { ICreateOfficeDTO } from '../dtos/ICreateOfficeDTO';
import { Office } from '../infra/typeorm/entities/Office';

export interface IOfficesRepository {
  create(data: ICreateOfficeDTO): Promise<Office>;
  findByName(name: string): Promise<Office | undefined>;
  findById(id: string): Promise<Office | undefined>;
  list(): Promise<Office[]>;
}
