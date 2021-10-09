import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';
import { createConnection } from '..';
import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

const create = async () => {
  const connection = await createConnection();

  const id = uuid();
  const password = await BCryptHashProvider.generateHash('pentpass');

  await connection.query(`
    INSERT INTO users(id, name, password)
    VALUES ('${id}', 'admin', '${password}')
  `);
};

create().then(() => console.log('User admin was created!'));
