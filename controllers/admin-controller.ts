import type { Request, Response } from 'express';
import { Product } from '../model/product';
import { nanoid } from 'nanoid';

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
  const product = {};
  res.render('admin/edit-product', {
    product,
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
}

export function addProduct(req: Request, res: Response) {
  const { title, imageUrl, description, price } = req.body;
  if (!title || !imageUrl || !description || !price) {
    return;
  }

  const product = new Product({ title, imageUrl, description, price });
  product.save();
  console.log('saved');
}

export function getEditProduct(req: Request, res: Response) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  console.log(productId);
  Product.findById(productId, (product) => {
    res.render('admin/edit-product', {
      product,
      pageTitle: `Edit ${product?.title}`,
      path: '/admin/edit-product',
      editing: editMode,
    });
  });
}

export function editProduct(req: Request, res: Response) {
  const { title, imageUrl, description, price } = req.body;
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    const updatedProduct = { ...product, title, imageUrl, description, price };
  });
  res.redirect('/');
}
