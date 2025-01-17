import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

interface OrderItemAttributes {
  id?: number;
  quantity: number;
}

export interface OrderItemInstance
  extends Model<OrderItemAttributes>,
    OrderItemAttributes {}

export const OrderItem = sequelize.define<OrderItemInstance>('orderItem', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
});
