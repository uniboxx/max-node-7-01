import express from 'express';
import * as shopController from '../controllers/shop-controller';

export const Router = express.Router();

Router.route('/').get(shopController.getIndex);
Router.route('/products').get(shopController.getProducts);
Router.route('/cart').get(shopController.getCart);
Router.route('/orders').get(shopController.getOrders);
Router.route('/checkout').get(shopController.getCheckout);
