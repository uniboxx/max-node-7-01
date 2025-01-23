import express, { type NextFunction, type Response } from 'express';
import helmet from 'helmet';

import { getNotFound } from './controllers/404.ts';

import { Router as shopRoutes } from './routes/shop-routes.ts';
import { Router as adminRoutes } from './routes/admin-routes.ts';
import { mongoConnect } from './utils/database.ts';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         scriptSrc: ["'self'", "'unsafe-inline'"],
//         imgSrc: ["'self'", 'https://plus.unsplash.com'],
//       },
//     },
//   })
// );

// app.use('/', (_, res: Response, next: NextFunction) => {
//   res.send('<script>alert("HELMET NOT WORKING!!!")</script>');
//   next();
// });
app.use(express.static('public'));

app.use(shopRoutes);
app.use(adminRoutes);

app.use('/', getNotFound);

mongoConnect().then((client) => {
  app.listen(port, () => {
    // console.log(client);
    console.log(`✅ Server is running on http://localhost:${port}`);
    console.log(`✅ You are in ${Bun.env.NODE_ENV?.toUpperCase()} mode`);
  });
});
