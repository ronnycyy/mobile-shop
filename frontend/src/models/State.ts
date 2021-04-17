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
  productDelete: ProductDelete,
  productCreate: ProductCreate,
  productUpdate: ProductUpdate,
  cart: Cart,
  userLogin: UserLogin,
  userRegister: UserRegister,
  userDetails: UserDetails,
  orderState: OrderState,
  orderDetails: OrderState,
  userList: UserList,
  userDelete: UserDelete,
  adminUserEdit: AdminUserEdit
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

class ProductUpdate extends BaseState {
  public success: boolean;
  public product: Product | null;

  constructor(loading: boolean, error: any, success: boolean, product: Product | null) {
    super(loading, error);
    this.success = success;
    this.product = product;
  }
}

class ProductCreate extends BaseState {
  public success: boolean;
  public product: Product | null;

  constructor(loading: boolean, error: any, success: boolean, product: Product | null) {
    super(loading, error);
    this.success = success;
    this.product = product;
  }
}

class ProductDelete extends BaseState {
  public success: boolean;

  constructor(loading: boolean, error: any, success: boolean) {
    super(loading, error);
    this.success = success;
  }
}

class UserList extends BaseState {
  public users: User[];

  constructor(loading: boolean, users: User[], error: any) {
    super(loading, error);
    this.users = users;
  }
}

class AdminUserEdit extends BaseState {
  public success: boolean;
  public user: User | null;

  constructor(loading: boolean, success: boolean, error: any, user: User | null) {
    super(loading, error);
    this.success = success;
    this.user = user;
  }
}

class UserDelete extends BaseState {
  public success: boolean;

  constructor(loading: boolean, success: boolean, error: any) {
    super(loading, error);
    this.success = success;
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
  OrderState,
  UserList,
  UserDelete,
  AdminUserEdit,
  ProductDelete,
  ProductCreate,
  ProductUpdate,
};

export type { State };

