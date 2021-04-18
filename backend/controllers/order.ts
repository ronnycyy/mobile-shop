import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/order';

// @desc    add order
// @route   POST /api/order
// @access  private
const addOrderItems = asyncHandler(async (req: any, res: Response) => {

  // 购买产品，邮寄地址，支付方式，商品费用，邮费，总价
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error(`No Product In Order.`);
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    })

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
})

// @desc    get order by id
// @route   GET /api/order/:id
// @access  private
const getOrderById = asyncHandler(async (req: any, res: Response) => {

  // 订单上附加用户信息
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error(`Order Not Found`);
  }
})

// @desc    get all orders
// @route   GET /api/orders
// @access  private (only admin)
const getOrders = asyncHandler(async (req: any, res: Response) => {

  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);

})

export { addOrderItems, getOrderById, getOrders };
