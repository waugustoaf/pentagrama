import { OfficesRepository } from '@modules/offices/infra/typeorm/repositories/OfficesRepository';
import { IOfficesRepository } from '@modules/offices/repositories/IOfficesRepository';
import { IPeopleRepository } from '@modules/people/infra/repositories/IPeopleRepository';
import { PeopleRepository } from '@modules/people/infra/typeorm/repositories/PeopleRepository';
import { ProfessionTypesRepository } from '@modules/professionTypes/infra/typeorm/repositories/ProfessionTypesRepository';
import { IProfessionTypesRepository } from '@modules/professionTypes/repositories/IProfessionTypesRepository';
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

container.registerSingleton<IProfessionTypesRepository>(
  'ProfessionTypesRepository',
  ProfessionTypesRepository,
);

container.registerSingleton<IPeopleRepository>(
  'PeopleRepository',
  PeopleRepository,
);
