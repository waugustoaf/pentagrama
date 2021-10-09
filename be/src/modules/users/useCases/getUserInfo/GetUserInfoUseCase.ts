import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

@injectable()
export class GetUserInfoUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    return classToClass(user);
  }
}
