import express from 'express';

import * as adminController from '../controllers/admin-controller';

export const Router = express.Router();

Router.route('/admin/add-product')
  .get(adminController.getAddProduct)
  .post(adminController.addProduct);

Router.route('/admin/products').get(adminController.getProducts);

// Router.route('/admin/edit-product:id').get(adminController);