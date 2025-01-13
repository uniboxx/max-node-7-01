import express from 'express';

import * as adminController from '../controllers/admin-controller';

export const Router = express.Router();

Router.route('/admin/add-product')
  .get(adminController.getAddProduct)
  .post(adminController.addProduct);

Router.route('/admin/products').get(adminController.getProducts);

Router.route('/admin/edit-product/:productId').get(
  adminController.getEditProduct
);

Router.route('/admin/edit-product').post(adminController.editProduct);
Router.route('/admin/delete-product').post(adminController.deleteProduct);
