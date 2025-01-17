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

// export async function syncSequelize() {
//   try {
//     // .sync({ force: true })
//     sequelize
//       .sync()
//       .then((user) => {
//         return User.findByPk(1);
//       })
//       .then((user) => {
//         // console.log(user);
//         if (!user) {
//           User.create({ name: 'Unibox', email: 'unibox@duck.com' });
//         }
//         user?.createCart();
//       });
//   } catch (error: any) {
//     console.error(error.message);
//   }
// }
