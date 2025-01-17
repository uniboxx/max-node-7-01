import type { Request, Response } from 'express';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

export async function getIndex(_: Request, res: Response) {
  try {
    const products = await Product.findAll();

    res.render('shop/index', {
      products,
      pageTitle: 'Shop',
      path: '/',
    });
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getProducts(_: Request, res: Response) {
  try {
    const products = await Product.findAll();
    res.render('shop/product-list', {
      products,
      pageTitle: 'All Products',
      path: '/products',
    });
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (product) {
      res.render('shop/product-detail', {
        product,
        pageTitle: product.title,
        path: '/products',
      });
    } else {
      res.status(404).redirect('/products');
    }
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getCart(req: Request, res: Response) {
  try {
    const cart = await req.user.getCart();
    console.log('CART', cart);
    const cartProducts = await cart.getProducts();
    const totalPrice =
      cartProducts?.reduce(
        (sum, item: any) => (sum += item.price * item.cartItem.quantity),
        0
      ) || 0;

    res.render('shop/cart', {
      cartProducts,
      totalPrice,
      pageTitle: 'Your Cart',
      path: '/cart',
    });
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function addToCart(req: Request, res: Response) {
  try {
    const { productId } = req.body;
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts({
      where: { id: productId },
    });
    let cartProduct: any;
    cartProduct = cartProducts.length && cartProducts[0];

    let newQuantity = 1;
    if (cartProduct) {
      const oldQuantity = cartProduct.cartItem?.quantity;
      newQuantity = oldQuantity + 1;
    } else {
      cartProduct = await Product.findByPk(productId);
    }
    cartProduct &&
      cart.addProduct(cartProduct, { through: { quantity: newQuantity } });
    res.redirect('/cart');
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function subtractToCart(req: Request, res: Response) {
  try {
    const { productId } = req.body;
    const cart = await req.user.getCart();
    const product: any = (
      await cart.getProducts({ where: { id: productId } })
    )[0];
    console.log('product', product);
    product.cartItem.quantity--;
    product.cartItem.save();
    res.status(204).end();
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function removeFromCart(req: Request, res: Response) {
  const { productId } = req.body;
  const cart = await req.user.getCart();
  const product: any = (
    await cart.getProducts({ where: { id: productId } })
  )[0];

  await product.cartItem.destroy();
  res.status(204).end();
}

export async function additionToCart(req: Request, res: Response) {
  const cart = await req.user.getCart();

  const { productId } = req.body;
  const product: any = (
    await cart.getProducts({ where: { id: productId } })
  )[0];

  product.cartItem.quantity++;
  product.cartItem.save();
  res.status(204).end();
}

export async function createOrder(req: Request, res: Response) {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    // console.log('PRODUCTS', products);
    const order = await req.user.createOrder();
    const orderProducts = order.addProducts(
      products.map((product: any) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );
    cart.setProducts(null);
    res.redirect('/orders');
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await req.user.getOrders({ include: ['products'] });
    res.render('shop/orders', {
      orders,
      pageTitle: 'Your orders',
      path: '/orders',
    });
    console.log('ORDERS', orders);
  } catch (error: any) {
    console.error(error.message);
  }
}

export function getCheckout(_: Request, res: Response) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}
