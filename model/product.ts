import fs from 'fs';
import path from 'path';
import { appDir } from '../utils/path';
import { nanoid } from 'nanoid';

interface ProductType {
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
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
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
          err && console.log(err);
        });
      } else {
        this.id = nanoid();
        products.push(this);
        fs.writeFile(dataPath, JSON.stringify(products), (err) => {
          err && console.log(err);
        });
      }
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
