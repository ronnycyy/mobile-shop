import mongoose from "mongoose";

// 订单表
const orderSchema = new mongoose.Schema({
  user: {    // 客户
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [{    // 货物详情
    name: { type: String, required: true },
    count: { type: Number, required: true },  // 数量
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  }],
  shippingAddress: {  // 邮寄地址
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    province: { type: String, required: true }
  },
  paymentMethod: {   // 支付方式
    type: String,
    required: true
  },
  paymentRequest: {
    id: { type: String },
    status: { type: String },
    updateTime: { type: String },
    wechatAddress: { type: String },
  },
  isDelivered: {   // 是否已寄出
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {  // 寄出时间
    type: Date
  },
  shippingPrice: {  // 邮费
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {  // 总价
    type: Number,
    required: true,
    default: 0
  },
  isPaid: {   // 是否已支付
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {   // 支付时间
    type: Date,
  }
})

const Order = mongoose.model('Order', orderSchema);

export default Order;
