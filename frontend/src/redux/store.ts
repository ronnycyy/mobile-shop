import { orderCreateReducer, orderDetailsReducer } from './reducers/order';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Cart, OrderState, ProductDetails, ProductList, UserDetails, UserLogin, UserRegister } from '../models/State';
import { cartReducer } from './reducers/cart';
import { productDetailsReducer, productListReducer } from './reducers/product';
import { userDetailReducer, userLoginReducer, userRegisterReducer } from './reducers/user';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  orderState: orderCreateReducer,
  orderDetails: orderDetailsReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse('' + localStorage.getItem('cartItems')) : [];
const userFromStorage = localStorage.getItem('user') ? JSON.parse('' + localStorage.getItem('user')) : null;
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse('' + localStorage.getItem('shippingAddress')) : null;
const paymentMethod = localStorage.getItem('paymentMethod') ? JSON.parse('' + localStorage.getItem('paymentMethod')) : null;

const initialState = {
  productList: new ProductList(false, [], null),
  productDetails: new ProductDetails(false, null, null),
  cart: new Cart(false, cartItemsFromStorage, null, shippingAddress, paymentMethod),
  userLogin: new UserLogin(false, userFromStorage, null),
  userRegister: new UserRegister(false, null, null),
  userDetails: new UserDetails(false, null, null, false),
  orderState: new OrderState(false, null, null, false),
  orderDetails: new OrderState(false, null, null, false),
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
