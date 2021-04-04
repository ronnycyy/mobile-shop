import { ORDER_CREATE, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILED, ORDER_DETAILS, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED } from './../../constant/order';
import myAction from "../../models/Action";
import { OrderState } from '../../models/State';


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
