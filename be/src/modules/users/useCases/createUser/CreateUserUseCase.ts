import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  username: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IRequest) {
    if (!data.username || !data.password) {
      throw new AppError('Username and password are required.');
    }

    const userAlreadyExists = await this.usersRepository.findByUsername(
      data.username,
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const user = await this.usersRepository.create(data);

    return user;
  }
}
