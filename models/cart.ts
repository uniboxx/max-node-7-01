import type { ProductAttributes, ProductInstance } from './product';

interface CartAttributes {
  id?: number;
}

export interface CartInstance extends Model<CartAttributes>, CartAttributes {
  getProducts: (object?: {}) => Promise<ProductInstance[]>;
  addProduct: (
    product: ProductAttributes,
    other: {}
  ) => Promise<ProductInstance>;
  setProducts: (object: any) => Promise<ProductInstance[]>;
}

export const Cart = sequelize.define<CartInstance>('cart', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});
