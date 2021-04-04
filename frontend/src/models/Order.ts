import ShippingAddress from './ShippingAddress';

class Order {
  public _id: string;
  public orderItems: any[];
  public shippingAddress: ShippingAddress;
  public paymentMethod: string;
  public itemsPrice: string;  // 商品价格
  public shippingPrice: string;  // 邮费
  public totalPrice: string;  // 总价
  public user?: OrderUser;  // 订单归属用户
  public isDelivered?: boolean; //是否已发货
  public isPaid?: boolean;  //是否已支付

  constructor(orderItems: any[], shippingAddress: ShippingAddress, paymentMethod: string, itemsPrice: string, shippingPrice: string, totalPrice: string, _id: string) {
    this.orderItems = orderItems;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.itemsPrice = itemsPrice;
    this.shippingPrice = shippingPrice;
    this.totalPrice = totalPrice;
    this._id = _id;
  }
}

class OrderUser {
  public _id: string;
  public name: string;
  public email: string;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this.name = name;
    this.email = email;
  }
}

export default Order;
