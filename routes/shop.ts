import express from 'express';
import * as productController from '../controllers/products';

export const Router = express.Router();

Router.route('/').get(productController.getProducts);
