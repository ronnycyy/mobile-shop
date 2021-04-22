import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from './../../constant/cart';
import myAction from "../../models/Action";
import { Cart } from "../../models/State";
import ShippingAddress from '../../models/ShippingAddress';

export const cartReducer = (state: Cart = new Cart(false, [], null, new ShippingAddress('', '', '', ''), ''), action: myAction) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;

      const existedItem = state.cartItems.find((c) => c.product === item.product);

      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((c) => c.product === existedItem.product ? item : c)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.product !== action.payload)
      }
    }
    case CART_CLEAR_ITEMS: {
      return {
        ...state,
        cartItems: []
      }
    }
    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload
      }
    }
    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload
      }
    }
    default:
      return state;
  }
}