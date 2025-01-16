import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

interface CartItemAttributes {
  id?: number;
  quantity: number;
}

export interface CartItemInstance
  extends Model<CartItemAttributes>,
    CartItemAttributes {}

export const CartItem = sequelize.define('cartItem', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});
