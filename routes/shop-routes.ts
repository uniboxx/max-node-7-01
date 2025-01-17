import express from 'express';
import * as shopController from '../controllers/shop-controller';

export const Router = express.Router();

Router.route('/').get(shopController.getIndex);
Router.route('/products').get(shopController.getProducts);
Router.route('/products/:productId').get(shopController.getProduct);
Router.route('/cart')
  .get(shopController.getCart)
  .post(shopController.addToCart);

Router.route('/cart-subtract').post(shopController.subtractToCart);
Router.route('/cart-addition').post(shopController.additionToCart);
Router.route('/cart-delete-product').post(shopController.removeFromCart);
Router.route('/create-order').post(shopController.createOrder);
Router.route('/orders').get(shopController.getOrders);
Router.route('/checkout').get(shopController.getCheckout);
