"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _order = require("./../controllers/order");

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middlewares/auth");

var router = _express["default"].Router();

router.route('/').post(_auth.protect, _order.addOrderItems).get(_auth.protect, _auth.isAdmin, _order.getOrders);
router.route('/:id').get(_auth.protect, _order.getOrderById);
var _default = router;
exports["default"] = _default;