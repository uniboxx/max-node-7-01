import express from 'express';

import * as productController from '../controllers/products';

export const Router = express.Router();

Router.route('/admin/add-product')
  .get(productController.getAddProduct)
  .post(productController.addProduct);
