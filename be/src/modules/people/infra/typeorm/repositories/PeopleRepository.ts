import { ICreatePersonDTO } from '@modules/people/dtos/ICreatePersonDTO';
import { getRepository, Repository } from 'typeorm';
import { IPeopleRepository } from '../../repositories/IPeopleRepository';
import { Person } from '../entities/Person';

export class PeopleRepository implements IPeopleRepository {
  private repository: Repository<Person>;

  constructor() {
    this.repository = getRepository(Person);
  }

  async create(data: ICreatePersonDTO): Promise<Person> {
    const person = this.repository.create(data);

    await this.repository.save(person);

    return person;
  }

  async findById(id: string): Promise<Person | undefined> {
    const person = await this.repository.findOne(id);

    return person;
  }

  async findByCPF(cpf: string): Promise<Person | undefined> {
    const person = await this.repository.findOne({ where: { cpf } });

    return person;
  }

  async delete(personId: string): Promise<void> {
    await this.repository.delete(personId);
  }

  async list(): Promise<Person[]> {
    return await this.repository.find();
  }
}
