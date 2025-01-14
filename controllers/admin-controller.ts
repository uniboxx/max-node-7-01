import type { Request, Response } from 'express';
import { Product } from '../models/product';

export function getProducts(_: Request, res: Response) {
  Product.findAll()
    .then((products) => {
      if (products.length) {
        res.render('admin/products', {
          products,
          pageTitle: 'Admin Products',
          path: '/admin/products',
        });
      } else {
        res.status(404).send('No Products found');
      }
    })
    .catch((err) => console.error(err.message));
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

  Product.create({
    title,
    imageUrl,
    description,
    price,
  })
    .then((result) => {
      console.log('PRODUCT CREATED');
      res.status(204).redirect('/products');
    })
    .catch((err) => console.error(err.message));
}

export function getEditProduct(req: Request, res: Response) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      if (product) {
        console.log(product);
        res.render('admin/edit-product', {
          product,
          pageTitle: `Edit ${product.title}`,
          path: '/admin/edit-product',
          editing: editMode,
        });
      } else {
        res.status(404).send('No product found');
      }
    })
    .catch((err) => console.error(err.message));
}

export function editProduct(req: Request, res: Response) {
  const { productId, title, imageUrl, description, price } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      if (product) {
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        return product.save();
      } else {
        res.status(404).send('Product not found');
      }
    })
    .then((result) => {
      console.log('PRODUCT UPDATED');
      res.status(204).redirect('/admin/products');
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Something went wrong!');
    });
}

export function deleteProduct(req: Request, res: Response) {
  const { productId } = req.body;

  Product.findByPk(productId)
    .then((product) => {
      if (product) {
        return product.destroy();
      } else {
        res.send('Product not found');
      }
    })
    .then((result) => {
      console.log('PRODUCT DELETED');
      res.status(204).redirect('/admin/products');
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Failed to delete product');
    });
}
