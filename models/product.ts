import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

interface Product extends Model {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const Product = sequelize.define<Product>('product', {
  id: {
    type: DataTypes.INTEGER,
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
