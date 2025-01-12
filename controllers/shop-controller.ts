import type { Request, Response } from 'express';
import { Product } from '../model/product';
import { Cart } from '../model/cart';

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

export function getProduct(req: Request, res: Response) {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product?.title,
      path: '/products',
    });
  });
}

export function getCart(_: Request, res: Response) {
  const cart = Cart.getCart();
  res.render('shop/cart', {
    cart,
    pageTitle: 'Your Cart',
    path: '/cart',
  });
}

export function addToCart(req: Request, res: Response) {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    product && Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
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
