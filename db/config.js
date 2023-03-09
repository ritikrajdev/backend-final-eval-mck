import { config } from 'dotenv';

if (!String(process.env.NODE_ENV).includes('docker')) {
  config();
}

const { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;

const databaseConfig = {};
databaseConfig[NODE_ENV ?? 'development'] = {
  username: DB_USER ?? 'postgres',
  password: DB_PASSWORD ?? 'postgres',
  database: DB_NAME ?? 'postgres',
  host: DB_HOST ?? 'localhost',
  port: DB_PORT ?? 5432,
  dialect: 'postgres',
};

export default databaseConfig;
