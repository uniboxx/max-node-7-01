import { getDb } from '../utils/database';

// interface ProductArguments {
//   id: string;
//   title: string;
//   imageUrl: string;
//   description: string;
//   price: number;
// }

export class Product {
  constructor(
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  async save() {
    try {
      const db = getDb();
      const product = await db.collection('products').insertOne(this);
      console.log('result: ', product);
      return product;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  static async fetchAll() {
    try {
      const db = getDb();
      const products = await db.collection('products').find().toArray();
      return products;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
