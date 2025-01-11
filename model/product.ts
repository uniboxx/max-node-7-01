import fs from 'fs';
import path from 'path';
import { appDir } from '../utils/path';

interface ProductType {
  title: string;
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

  constructor(t: string) {
    this.title = t;
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
}
