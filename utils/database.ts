//- WHITOUT SEQUELIZE
// import mysql from 'mysql2/promise';

// export const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'daw',
//   database: 'node_complete',
//   password: 'qfmsprlp',
// });
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('node_complete', 'daw', 'qfmsprlp', {
  dialect: 'mariadb',
  host: 'localhost',
});
