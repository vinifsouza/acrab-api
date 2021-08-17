import Knex from 'knex';
import { ACRAB_DB_CONN_PATH, ACRAB_DB_CONN_STRING } from '../../config';

const knex = Knex({
  client: 'pg',
  connection: {
    connectionString: ACRAB_DB_CONN_STRING,
    ssl: { rejectUnauthorized: false }
  },
  searchPath: [ACRAB_DB_CONN_PATH],
});

export default knex;
