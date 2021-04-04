import { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED } from './../../constant/product';
import Action from '../../models/Action';
import { Dispatch } from 'redux';
import { PRODUCT_LIST_REQUEST } from "../../constant/product"
import axios from 'axios';

const listProducts = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

const listProductDetails = (id: string) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export { listProductDetails, listProducts }
