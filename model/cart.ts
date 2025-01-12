import fs from 'fs';
import path from 'path';
import { appDir } from '../utils/path';

const dataPath = path.join(appDir, 'data', 'cart.json');

interface Product {
  id: string;
  quantity: number;
}
let cart: { products: Product[]; totalPrice: number } = {
  products: [],
  totalPrice: 0,
};

export class Cart {
  static addProduct(id: string, productPrice: number) {
    // fetch the previous cart
    fs.readFile(dataPath, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      // analize the cart => find existing product
      const exintingProductIndex = cart.products.findIndex(
        (product: Product) => product.id === id
      );
      const existingProduct = cart.products[exintingProductIndex];
      let updatedProduct;
      // add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity++;
        cart.products[exintingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice =
        Math.ceil((+cart.totalPrice + +productPrice) * 100) / 100;
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart() {
    return cart;
  }
}
