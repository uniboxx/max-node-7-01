import type { Request, Response } from 'express';
import { Product } from '../model/product';

export function getIndex(_: Request, res: Response) {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
}
export function getProducts(_: Request, res: Response) {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
}

export function getCart(_: Request, res: Response) {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
}

export function getOrders(_: Request, res: Response) {
  res.render('shop/orders', {
    pageTitle: 'Your orders',
    path: '/orders',
  });
}

export function getCheckout(_: Request, res: Response) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}
