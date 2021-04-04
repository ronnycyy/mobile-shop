import myAction from '../../models/Action';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED } from '../../constant/product';
import { ProductList, ProductDetails } from '../../models/State';

const productListReducer = (state = new ProductList(false, [], null), action: myAction) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, error: null, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, error: null, products: action.payload }
    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload, products: state.products }
    default:
      return state;
  }
}

const productDetailsReducer = (state = new ProductDetails(false, null, null), action: myAction) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, error: null, product: null }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, error: null, product: action.payload }
    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload, product: state.product }
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer
};
