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

  const product = new Product({
    id: null,
    title,
    imageUrl,
    description,
    price,
  });
  product.save();

  res.status(201).end();
}

export function getEditProduct(req: Request, res: Response) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;

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
  const { productId: id, title, imageUrl, description, price } = req.body;

  const updatedProduct = new Product({
    id,
    title,
    imageUrl,
    description,
    price,
  });

  updatedProduct.save();
  res.status(204).end();
}
