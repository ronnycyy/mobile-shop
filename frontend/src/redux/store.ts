import { orderCreateReducer, orderDetailsReducer } from './reducers/order';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AdminUserEdit, Cart, OrderState, ProductCreate, ProductDelete, ProductDetails, ProductList, ProductUpdate, UserDelete, UserDetails, UserList, UserLogin, UserRegister } from '../models/State';
import { cartReducer } from './reducers/cart';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/product';
import { adminUserEditReducer, userDeleteReducer, userDetailReducer, userListReducer, userLoginReducer, userRegisterReducer } from './reducers/user';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  orderState: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  adminUserEdit: adminUserEditReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse('' + localStorage.getItem('cartItems')) : [];
const userFromStorage = localStorage.getItem('user') ? JSON.parse('' + localStorage.getItem('user')) : null;
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse('' + localStorage.getItem('shippingAddress')) : null;
const paymentMethod = localStorage.getItem('paymentMethod') ? JSON.parse('' + localStorage.getItem('paymentMethod')) : null;

const initialState = {
  productList: new ProductList(false, [], null),
  productDetails: new ProductDetails(false, null, null),
  productDelete: new ProductDelete(false, null, false),
  productCreate: new ProductCreate(false, null, false, null),
  productUpdate: new ProductUpdate(false, null, false, null),
  cart: new Cart(false, cartItemsFromStorage, null, shippingAddress, paymentMethod),
  userLogin: new UserLogin(false, userFromStorage, null),
  userRegister: new UserRegister(false, null, null),
  userDetails: new UserDetails(false, null, null, false),
  orderState: new OrderState(false, null, null, false),
  orderDetails: new OrderState(false, null, null, false),
  userList: new UserList(false, [], null),
  userDelete: new UserDelete(false, false, null),
  adminUserEdit: new AdminUserEdit(false, false, null, null)
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
