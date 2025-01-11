import express from 'express';

import { getNotFound } from './controllers/404.ts';

import { Router as shopRoutes } from './routes/shop.ts';
import { Router as adminRoutes } from './routes/admin.ts';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(shopRoutes);
app.use(adminRoutes);

app.use('/', getNotFound);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
