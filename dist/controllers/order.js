"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = exports.getOrderById = exports.addOrderItems = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _order = _interopRequireDefault(require("../models/order"));

// @desc    add order
// @route   POST /api/order
// @access  private
var addOrderItems = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, order, createOrder;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 购买产品，邮寄地址，支付方式，商品费用，邮费，总价
            _req$body = req.body, orderItems = _req$body.orderItems, shippingAddress = _req$body.shippingAddress, paymentMethod = _req$body.paymentMethod, itemsPrice = _req$body.itemsPrice, shippingPrice = _req$body.shippingPrice, totalPrice = _req$body.totalPrice;

            if (!(orderItems && orderItems.length === 0)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            throw new Error("No Product In Order.");

          case 6:
            order = new _order["default"]({
              user: req.user._id,
              orderItems: orderItems,
              shippingAddress: shippingAddress,
              paymentMethod: paymentMethod,
              itemsPrice: itemsPrice,
              shippingPrice: shippingPrice,
              totalPrice: totalPrice
            });
            _context.next = 9;
            return order.save();

          case 9:
            createOrder = _context.sent;
            res.status(201).json(createOrder);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // @desc    get order by id
// @route   GET /api/order/:id
// @access  private

exports.addOrderItems = addOrderItems;
var getOrderById = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _order["default"].findById(req.params.id).populate('user', 'name email');

          case 2:
            order = _context2.sent;

            if (!order) {
              _context2.next = 7;
              break;
            }

            res.json(order);
            _context2.next = 9;
            break;

          case 7:
            res.status(404);
            throw new Error("Order Not Found");

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // @desc    get all orders
// @route   GET /api/orders
// @access  private (only admin)

exports.getOrderById = getOrderById;
var getOrders = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _order["default"].find({}).populate('user', 'id name');

          case 2:
            orders = _context3.sent;
            res.json(orders);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
exports.getOrders = getOrders;