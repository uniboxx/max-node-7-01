import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';
import {
  Product,
  type ProductAttributes,
  type ProductInstance,
} from './product';
import { Cart, type CartInstance } from './cart';
import { CartItem } from './cart-item';
import { Order } from './order';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  getProducts: (object?: {}) => Promise<ProductInstance[]>;
  createProduct: (Product: ProductAttributes) => Promise<ProductInstance>;
  getCart: () => Promise<CartInstance>;
  createCart: () => Promise<CartInstance>;
}

export const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
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
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(pro);
