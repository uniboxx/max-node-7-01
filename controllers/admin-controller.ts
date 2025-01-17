import type { Request, Response } from 'express';
import { Product } from '../models/product';

export async function getProducts(req: Request, res: Response) {
  // Product.findAll({ where: { userId: req.user.id } })
  try {
    const products = await req.user.getProducts();

    res.render('admin/products', {
      products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  } catch (err: any) {
    console.error(err.message);
  }
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

export async function addProduct(req: Request, res: Response) {
  try {
    const { title, imageUrl, description, price } = req.body;
    if (!title || !imageUrl || !description || !price) {
      return;
    }

    const newProduct = await req.user.createProduct({
      title,
      imageUrl,
      description,
      price,
    });
    // console.log('product', product);

    console.log('PRODUCT CREATED');
    res.status(204).redirect('/admin/products');
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getEditProduct(req: Request, res: Response) {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const productId = req.params.productId;

    const products = await req.user.getProducts({ where: { id: productId } });
    const product = products[0];

    if (product) {
      // console.log('PRODUCT', product);
      product &&
        res.render('admin/edit-product', {
          product,
          pageTitle: `Edit ${product.title}`,
          path: '/admin/edit-product',
          editing: editMode,
        });
    } else {
      res.redirect('/admin/products');
    }
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function editProduct(req: Request, res: Response) {
  try {
    const { productId, title, imageUrl, description, price } = req.body;
    const products = await req.user.getProducts({ where: { id: productId } });
    const product = products[0];

    if (product) {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;

      const updatedProduct = await product.save();
      // console.log('UPDATE PRODUCT', updatedProduct);
      console.log('PRODUCT UPDATED');
      res.status(204).redirect('/admin/products');
    } else {
      res.redirect('/admin/products');
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Something went wrong!');
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    const products = await req.user.getProducts({ where: { id: productId } });

    const product = products[0];
    if (product) {
      const destroyed = await product.destroy();
      // console.log('DESTROYED', destroyed);
      console.log('PRODUCT DELETED');
      res.status(204).redirect('/admin/products');
    } else {
      res.send('Product not found');
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Failed to delete product');
  }
}
