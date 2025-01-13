import fs from 'fs';
import path from 'path';
import { appDir } from '../utils/path';

const dataPath = path.join(appDir, 'data', 'cart.json');

interface Product {
  id: string;
  quantity: number;
}
interface CartType {
  products: Product[];
  totalPrice: number;
}

export class Cart {
  static getCart(cb: (cart: CartType) => void): void {
    fs.readFile(
      dataPath,
      (err: NodeJS.ErrnoException | null, fileContent: Buffer) => {
        if (!err) {
          const cart: CartType = JSON.parse(fileContent.toString());
          cb(cart);
        } else {
          cb({ products: [], totalPrice: 0 });
        }
      }
    );
  }

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

  static deleteProduct(id: string, productPrice: number) {
    fs.readFile(dataPath, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent.toString());
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(
        (product: Product) => product.id === id
      );
      const productQty = product.quantity;
      updatedCart.products = updatedCart.products.filter(
        (product: Product) => product.id !== id
      );
      updatedCart.totalPrice -= productQty * productPrice;

      fs.writeFile(dataPath, JSON.stringify(updatedCart), (err) => {
        err && console.log(err);
      });
    });
  }
}
