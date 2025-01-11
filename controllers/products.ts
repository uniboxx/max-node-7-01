import { type Request, type Response } from 'express';
import { Product } from '../model/product';

export function getAddProduct(_: Request, res: Response) {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

export function addProduct(req: Request, res: Response) {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

export function getProducts(_: Request, res: Response) {
  Product.fetchAll((products) => {
    res.render('shop', { products, pageTitle: 'Shop', path: '/' });
  });
}
