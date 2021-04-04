import { ORDER_CREATE, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILED, ORDER_DETAILS, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED } from './../../constant/order';
import { Dispatch } from "react";
import Order from "../../models/Order";
import Action from '../../models/Action';
import axios from 'axios';


export const createOrder = (order: Order) => async (dispatch: Dispatch<Action>, getState: any) => {
  try {
    dispatch({ type: ORDER_CREATE });

    const { userLogin: { user } } = getState();

    // 传递的是json对象，所以要设置Content-Type: application/json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    }

    const { data } = await axios.post(`/api/order`, order, config);

    // const responseOrder = new Order(); // TODO: 维护返回值的类型

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getOrderById = (id: string) => async (dispatch: Dispatch<Action>, getState: any) => {
  try {
    dispatch({ type: ORDER_DETAILS });

    const { userLogin: { user } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    const { data } = await axios.get(`/api/order/${id}`, config);

    // const responseOrder = new Order(); // TODO: 维护返回值的类型

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
