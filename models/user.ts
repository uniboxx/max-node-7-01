import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';
import {
  Product,
  type ProductAttributes,
  type ProductInstance,
} from './product';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  getProducts: () => Promise<ProductInstance[]>;
  createProduct: (Product: ProductAttributes) => Promise<ProductInstance>;
}

export const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },

  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
});

User.hasMany(Product);
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});
