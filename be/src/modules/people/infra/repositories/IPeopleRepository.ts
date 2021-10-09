import { ICreatePersonDTO } from '@modules/people/dtos/ICreatePersonDTO';
import { Person } from '../typeorm/entities/Person';

export interface IPeopleRepository {
  create(data: ICreatePersonDTO): Promise<Person>;
  findById(id: string): Promise<Person | undefined>;
  findByCPF(cpf: string): Promise<Person | undefined>;
  delete(personId: string): Promise<void>;
  list(): Promise<Person[]>;
}
