// import fs from 'fs';
// import path from 'path';
// import { appDir } from '../utils/path';
import { nanoid } from 'nanoid';
import { Cart } from './cart';
import { pool as db } from '../utils/database';
import type { FieldPacket, QueryResult } from 'mysql2';

export interface ProductType {
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}
// const dataPath = path.join(appDir, 'data', 'products.json');

// function getProductsFromFile(cb: (products: ProductType[]) => void): void {
//   fs.readFile(
//     dataPath,
//     (err: NodeJS.ErrnoException | null, fileContent: Buffer) => {
//       if (err) {
//         return cb([]);
//       }
//       const products: ProductType[] = JSON.parse(fileContent.toString());
//       cb(products);
//     }
//   );
// }

export class Product {
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(product: ProductType) {
    {
      this.id = product.id;
      this.title = product.title.trim();
      this.imageUrl = product.imageUrl.trim();
      this.description = product.description.trim();
      this.price = product.price;
    }
  }

  save() {
    // getProductsFromFile((products) => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       (product) => product.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
    //       err && console.log(err);
    //     });
    //   } else {
    //     this.id = nanoid();
    //     products.push(this);
    //     fs.writeFile(dataPath, JSON.stringify(products), (err) => {
    //       err && console.log(err);
    //     });
    //   }
    // });
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  // static fetchAll(cb: (products: ProductType[]) => void): void {
  static fetchAll(): Promise<[QueryResult, FieldPacket[]]> {
    // getProductsFromFile(cb);
    return db.execute('SELECT * FROM products');
  }

  // static findById(id: string, cb: (product: ProductType | null) => void): void {
  static findById(productId: string): Promise<[QueryResult, FieldPacket[]]> {
    // getProductsFromFile((products) => {
    //   const product = products.find((product) => product.id === id);
    //   product && cb(product);
    // });
    return db.execute('SELECT * FROM products WHERE products.id = ?', [
      productId,
    ]);
  }

  static deleteById(id: string): void {
    // getProductsFromFile((products) => {
    //   const product = products.find((product) => product.id === id);
    //   const updatedProducts = products.filter((product) => product.id !== id);
    //   fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
    //     if (!err && product) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
  }
}
