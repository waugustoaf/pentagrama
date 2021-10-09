import { OfficesRepository } from '@modules/offices/infra/typeorm/repositories/OfficesRepository';
import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOfficesRepository>(
  'OfficesRepository',
  OfficesRepository,
);
