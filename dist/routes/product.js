"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _product = require("../controllers/product");

var _auth = require("../middlewares/auth");

var router = _express["default"].Router();

router.route('/').get(_product.getProducts).post(_auth.protect, _auth.isAdmin, _product.createProduct);
router.route('/top').get(_product.getTopProducts);
router.route('/:id').get(_product.getProductById)["delete"](_auth.protect, _auth.isAdmin, _product.deleteProductById).put(_auth.protect, _auth.isAdmin, _product.updateProduct);
router.route('/:id/reviews').post(_auth.protect, _product.createProductReviews);
var _default = router;
exports["default"] = _default;