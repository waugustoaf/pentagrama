import {
  Connection,
  createConnection as typeORMCreateConnection,
  getConnectionOptions,
} from 'typeorm';

export const createConnection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return typeORMCreateConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'db_pent_test'
          : defaultOptions.database,
    }),
  );
};
