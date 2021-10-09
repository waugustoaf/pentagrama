import { ICreateOfficeDTO } from '@modules/offices/dtos/ICreateOfficeDTO';
import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { getRepository, Repository } from 'typeorm';
import { Office } from '../entities/Office';

export class OfficesRepository implements IOfficesRepository {
  private repository: Repository<Office>;

  constructor() {
    this.repository = getRepository(Office);
  }

  async create(data: ICreateOfficeDTO): Promise<Office> {
    const office = this.repository.create(data);

    await this.repository.save(office);

    return office;
  }

  async findByName(name: string): Promise<Office | undefined> {
    const office = await this.repository.findOne({ where: { name } });

    return office;
  }

  async findById(id: string): Promise<Office | undefined> {
    const office = await this.repository.findOne(id);

    return office;
  }

  async list(): Promise<Office[]> {
    const offices = await this.repository.find();

    return offices;
  }

  async delete(officeId: string): Promise<void> {
    await this.repository.delete(officeId);
  }
}
