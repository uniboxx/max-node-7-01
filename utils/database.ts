//- WHITOUT SEQUELIZE
// import mysql from 'mysql2/promise';

// export const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'daw',
//   database: 'node_complete',
//   password: 'qfmsprlp',
// });

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  Bun.env.DATABASE_NAME!,
  Bun.env.DATABASE_USERNAME!,
  Bun.env.DATABASE_PASSWORD!,
  {
    dialect: 'mariadb',
    host: Bun.env.DATABASE_HOST!,
  }
);
