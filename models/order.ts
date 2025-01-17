import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

interface OrderAttributes {
  id?: number;
}

export interface OrderInstance
  extends Model<OrderAttributes>,
    OrderAttributes {}

export const Order = sequelize.define<OrderInstance>('order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});
