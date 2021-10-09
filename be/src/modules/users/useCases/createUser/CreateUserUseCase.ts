import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  password: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IRequest) {
    if (!data.name || !data.password) {
      throw new AppError('Name and password are required.');
    }

    const userAlreadyExists = await this.usersRepository.findByName(data.name);

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const user = await this.usersRepository.create(data);

    return user;
  }
}
