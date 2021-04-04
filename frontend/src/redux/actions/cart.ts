import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from './../../constant/cart';
import axios from "axios"
import CartItem from '../../models/CartItem';
import Action from '../../models/Action';
import { Dispatch } from 'redux';
import Product from '../../models/Product';
import ShippingAddress from '../../models/ShippingAddress';


export const addToCart = (id: string, count: number) => async (dispatch: Dispatch<Action>, getState: any) => {
  const { data } = await axios.get<Product>(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: new CartItem(data._id, data.name, data.image, data.price, data.countInStock, count)
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id: string) => async (dispatch: Dispatch<Action>, getState: any) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}


export const saveShippingAddress = (data: ShippingAddress) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data: any) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
