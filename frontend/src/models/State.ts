import ShippingAddress from './ShippingAddress';
// redux相关
// 存储本应用的所有状态结构

import BaseState from './Base';
import CartItem from './CartItem';
import Product from './Product';
import User from './User';
import Order from './Order';


interface State {
  productList: ProductList,
  productDetails: ProductDetails,
  cart: Cart,
  userLogin: UserLogin,
  userRegister: UserRegister,
  userDetails: UserDetails,
  orderState: OrderState,
  orderDetails: OrderState
}

class OrderState extends BaseState {
  public order: Order | null;
  public success: boolean;

  constructor(loading: boolean, order: Order | null, error: any, success: boolean) {
    super(loading, error);
    this.order = order;
    this.success = success;
  }
}


class Cart extends BaseState {
  public cartItems: CartItem[];
  public shippingAddress: ShippingAddress;
  public paymentMethod: string;

  constructor(loading: boolean, cartItems: CartItem[], error: any, shippingAddress: ShippingAddress, paymentMethod: string) {
    super(loading, error);
    this.cartItems = cartItems;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
  }
}


class ProductList extends BaseState {
  public products: Product[];

  constructor(loading: boolean, products: Product[], error: any) {
    super(loading, error);
    this.products = products;
  }

}

class ProductDetails extends BaseState {
  public product: Product | null;

  constructor(loading: boolean, product: Product | null, error: any) {
    super(loading, error);
    this.product = product;
  }
}

class UserLogin extends BaseState {
  public user: User | null;

  constructor(loading: boolean, user: User | null, error: any) {
    super(loading, error);
    this.user = user;
  }
}

class UserRegister extends BaseState {
  public user: User | null;

  constructor(loading: boolean, user: User | null, error: any) {
    super(loading, error);
    this.user = user;
  }
}

class UserDetails extends BaseState {
  public user: User | null;
  public updated: boolean;

  constructor(loading: boolean, user: User | null, error: any, updated: boolean) {
    super(loading, error);
    this.user = user;
    this.updated = updated;
  }
}


export {
  ProductList,
  ProductDetails,
  Cart,
  UserLogin,
  UserRegister,
  UserDetails,
  OrderState
};

export type { State };
