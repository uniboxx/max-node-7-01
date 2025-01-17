import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
const { xss } = require('express-xss-sanitizer');

import { getNotFound } from './controllers/404.ts';

import { Router as shopRoutes } from './routes/shop-routes.ts';
import { Router as adminRoutes } from './routes/admin-routes.ts';
import { sequelize } from './utils/database.ts';
import { User, type UserInstance } from './models/user.ts';

declare global {
  namespace Express {
    interface Request {
      // user: InstanceType<typeof User>;
      user: UserInstance;
    }
  }
}

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(xss());
app.use(express.static('public'));

app.use((req: Request, _: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error('User not found');
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
});

app.use(shopRoutes);
app.use(adminRoutes);

app.use('/', getNotFound);

// Product.findByPk(2).then((product) => console.log(product));

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return (
      User.findByPk(1) ||
      User.create({ name: 'Unibox', email: 'unibox@duck.com' })
    );
  })
  .then((user) => {
    return user?.getCart() || user?.createCart();
  })
  .then((cart) => {
    console.log('CART', cart?.id);
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
      console.log(`✅ You are in ${Bun.env.NODE_ENV?.toUpperCase()} mode`);
    });
  })
  .catch((err) => console.error(err.message));
