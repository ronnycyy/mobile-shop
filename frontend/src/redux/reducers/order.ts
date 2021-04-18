import { ORDER_CREATE, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILED, ORDER_DETAILS, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED, ORDER_LIST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILED } from './../../constant/order';
import myAction from "../../models/Action";
import { OrderList, OrderState } from '../../models/State';


export const orderCreateReducer = (state = new OrderState(false, null, null, false), action: myAction) => {
  switch (action.type) {
    case ORDER_CREATE:
      return new OrderState(true, null, null, false)
    case ORDER_CREATE_SUCCESS:
      return new OrderState(false, action.payload, null, true)
    case ORDER_CREATE_FAILED:
      return new OrderState(false, null, action.payload, false)
    default:
      return state;
  }
}

export const orderDetailsReducer = (state = new OrderState(false, null, null, false), action: myAction) => {
  switch (action.type) {
    case ORDER_DETAILS:
      return new OrderState(true, null, null, false)
    case ORDER_DETAILS_SUCCESS:
      return new OrderState(false, action.payload, null, true)
    case ORDER_DETAILS_FAILED:
      return new OrderState(false, null, action.payload, false)
    default:
      return state;
  }
}

export const orderListReducer = (state = new OrderList(false, [], null), action: myAction) => {
  switch (action.type) {
    case ORDER_LIST:
      return new OrderList(true, [], null)
    case ORDER_LIST_SUCCESS:
      return new OrderList(false, action.payload, null)
    case ORDER_LIST_FAILED:
      return new OrderList(false, [], action.payload)
    default:
      return state;
  }
}
