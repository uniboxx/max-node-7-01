
import { Product } from './product';

interface CartItemAttributes {
  id?: number;
  quantity: number;
}

export interface CartItemInstance
  extends Model<CartItemAttributes>,
    CartItemAttributes {}

export const CartItem = sequelize.define<CartItemInstance>('cartItem', {
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
