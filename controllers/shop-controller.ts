import type { Request, Response } from 'express';
import { Product, type ProductType } from '../model/product';
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
  Cart.getCart((cart) => {
    interface cartProductType {
      productData: ProductType;
      qty: number;
    }
    const cartProducts: cartProductType[] = [];
    Product.fetchAll((products) => {
      for (let product of products) {
        const productData = cart.products.find(
          (cartProduct) => cartProduct.id === product.id
        );
        if (productData) {
          cartProducts.push({
            productData: product,
            qty: productData.quantity,
          });
        }
      }
      console.log(cartProducts);
      res.render('shop/cart', {
        products: cartProducts,
        totalPrice: cart.totalPrice,
        pageTitle: 'Your Cart',
        path: '/cart',
      });
    });
  });
}

export function addToCart(req: Request, res: Response) {
  const { productId } = req.body;
  console.log('adding');
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
