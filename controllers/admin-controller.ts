import type { Request, Response } from 'express';
import { Product } from '../model/product';

export function getProducts(_: Request, res: Response) {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
}

export function getAddProduct(_: Request, res: Response) {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
}

export function addProduct(req: Request, res: Response) {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product({ title, imageUrl, description, price });
  product.save();
  res.redirect('/');
}

export function editProduct(req: Request, res: Response, id: number) {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product({ title, imageUrl, description, price });
  product.save();
  res.redirect('/');
}
