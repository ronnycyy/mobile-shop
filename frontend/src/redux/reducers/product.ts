import myAction from '../../models/Action';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILED, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAILED, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAILED, PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAILED, PRODUCT_CREATE_REVIEW_RESET } from '../../constant/product';
import { ProductList, ProductDetails, ProductDelete, ProductCreate, ProductUpdate, ProductCreateReview } from '../../models/State';

const productListReducer = (state = new ProductList(false, [], null), action: myAction) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, error: null, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page
      }
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

const productDeleteReducer = (state = new ProductDelete(false, null, false), action: myAction) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return new ProductDelete(true, null, false);
    case PRODUCT_DELETE_SUCCESS:
      return new ProductDelete(false, null, true);
    case PRODUCT_DELETE_FAILED:
      return new ProductDelete(false, action.payload, false);
    default:
      return state;
  }
}

const productCreateReducer = (state = new ProductCreate(false, null, false, null), action: myAction) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return new ProductCreate(true, null, false, null);
    case PRODUCT_CREATE_SUCCESS:
      return new ProductCreate(false, null, true, action.payload);
    case PRODUCT_CREATE_FAILED:
      return new ProductCreate(false, action.payload, false, null);
    case PRODUCT_CREATE_RESET:
      return new ProductCreate(false, null, false, null);
    default:
      return state;
  }
}

const productUpdateReducer = (state = new ProductUpdate(false, null, false, null), action: myAction) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return new ProductUpdate(true, null, false, null);
    case PRODUCT_UPDATE_SUCCESS:
      return new ProductUpdate(false, null, true, action.payload);
    case PRODUCT_UPDATE_FAILED:
      return new ProductUpdate(false, action.payload, false, null);
    case PRODUCT_UPDATE_RESET:
      return new ProductUpdate(false, null, false, null);
    default:
      return state;
  }
}

const productReviewCreateReducer = (state = new ProductCreateReview(false, null, false, null), action: myAction) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return new ProductCreateReview(true, null, false, null);
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return new ProductCreateReview(false, null, true, action.payload);
    case PRODUCT_CREATE_REVIEW_FAILED:
      return new ProductCreateReview(false, action.payload, false, null);
    case PRODUCT_CREATE_REVIEW_RESET:
      return new ProductCreateReview(false, null, false, null);
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer
};
