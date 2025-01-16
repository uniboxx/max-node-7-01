import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

export interface ProductAttributes {
  id?: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ProductInstance
  extends Model<ProductAttributes>,
    ProductAttributes {}

export const Product = sequelize.define<ProductInstance>('product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
