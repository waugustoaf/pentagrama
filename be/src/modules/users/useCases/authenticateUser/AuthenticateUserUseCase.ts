import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import { AppError } from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('username or password incorrect');
    }

    const passwordMatch = await BCryptHashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Username or password incorrect');
    }

    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_token,
    });

    return {
      user: classToClass(user),
      token,
    };
  }
}
