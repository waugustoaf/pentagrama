import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute() {
    const users = await this.usersRepository.list();

    return classToClass(users);
  }
}
