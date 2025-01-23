import type { ProductInstance } from './product';

interface OrderAttributes {
  id?: number;
}

export interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {
  addProducts: (
    products: ProductInstance[],
    options?: {}
  ) => Promise<ProductInstance[]>;
}

export const Order = sequelize.define<OrderInstance>('order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});
