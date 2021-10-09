import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
