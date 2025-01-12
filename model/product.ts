import fs from 'fs';
import path from 'path';
import { appDir } from '../utils/path';
import { nanoid } from 'nanoid';

interface ProductType {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  id: string;
}
const dataPath = path.join(appDir, 'data', 'products.json');

function getProductsFromFile(cb: (products: ProductType[]) => void): void {
  fs.readFile(
    dataPath,
    (err: NodeJS.ErrnoException | null, fileContent: Buffer) => {
      if (err) {
        return cb([]);
      }
      const products: ProductType[] = JSON.parse(fileContent.toString());
      cb(products);
    }
  );
}

export class Product {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  id: string;

  constructor(product: {
    title: string;
    imageUrl: string;
    description: string;
    price: number;
  }) {
    {
      this.title = product.title;
      this.imageUrl = product.imageUrl;
      this.description = product.description;
      this.price = product.price;
      this.id = nanoid();
    }
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        err && console.log(err);
      });
    });
  }

  static fetchAll(cb: (products: ProductType[]) => void): void {
    getProductsFromFile(cb);
  }

  static findById(id: string, cb: (product: ProductType | null) => void): void {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id) || null;

      product && cb(product);
    });
  }
}
