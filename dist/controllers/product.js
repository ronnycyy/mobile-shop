"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopProducts = exports.createProductReviews = exports.updateProduct = exports.createProduct = exports.deleteProductById = exports.getProductById = exports.getProducts = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _product = _interopRequireDefault(require("../models/product"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// @desc    fetch all products
// @route   GET /api/products
// @access  public
var getProducts = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pageSize, page, keyword, count, products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageSize = 4;
            page = Number(req.query.pageNumber) || 1;
            keyword = req.query.keyword ? {
              name: {
                $regex: req.query.keyword,
                $options: 'i'
              }
            } : {};
            _context.next = 5;
            return _product["default"].countDocuments(_objectSpread({}, keyword));

          case 5:
            count = _context.sent;
            _context.next = 8;
            return _product["default"].find(_objectSpread({}, keyword)).limit(pageSize).skip(pageSize * (page - 1));

          case 8:
            products = _context.sent;
            res.json({
              products: products,
              // 过滤后的产品列表
              page: page,
              // 当前页码
              pages: Math.ceil(count / pageSize) // 总页码数

            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // @desc    fetch single product
// @route   GET /api/products/:id
// @access  public

exports.getProducts = getProducts;
var getProductById = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _product["default"].findById(req.params.id);

          case 2:
            product = _context2.sent;

            if (product) {
              res.json(product);
            } else {
              res.status(404);
              next(new Error("Product Not Found."));
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); // @desc    delete single product
// @route   DELETE /api/products/:id
// @access  private (only admin)

exports.getProductById = getProductById;
var deleteProductById = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _product["default"].findById(req.params.id);

          case 2:
            product = _context3.sent;

            if (!product) {
              _context3.next = 9;
              break;
            }

            _context3.next = 6;
            return product.remove();

          case 6:
            res.json({
              message: '产品删除成功'
            });
            _context3.next = 11;
            break;

          case 9:
            res.status(404);
            next(new Error("Product Not Found."));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}()); // @desc    create single product
// @route   POST /api/products/:id
// @access  private (only admin)

exports.deleteProductById = deleteProductById;
var createProduct = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var product, createdProduct;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            product = new _product["default"]({
              name: '样本名称',
              price: 0,
              user: req.user._id,
              image: '/images/sample.jpg',
              brand: '样品品牌',
              category: '样品分类',
              countInStock: 0,
              numReviews: 0,
              description: '样品描述',
              rating: 0
            });
            _context4.next = 3;
            return product.save();

          case 3:
            createdProduct = _context4.sent;
            res.status(201).json(createdProduct);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}()); // @desc    create product review
// @route   POST /api/products/:id/reviews
// @access  private

exports.createProduct = createProduct;
var createProductReviews = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, rating, comment, product, alreadyReviewed, review;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, rating = _req$body.rating, comment = _req$body.comment;
            _context5.next = 3;
            return _product["default"].findById(req.params.id);

          case 3:
            product = _context5.sent;

            if (!product) {
              _context5.next = 18;
              break;
            }

            // 判断用户是否已评论，如果已评论，不能再评论
            alreadyReviewed = product.reviews.find(function (review) {
              return review.user.toString() === req.user._id.toString();
            });

            if (!alreadyReviewed) {
              _context5.next = 9;
              break;
            }

            res.status(400);
            throw new Error('您已经评论过该产品');

          case 9:
            review = {
              name: req.user.name,
              rating: Number(rating),
              comment: comment,
              user: req.user._id
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce(function (acc, review) {
              return acc + review.rating;
            }, 0) / product.reviews.length;
            _context5.next = 15;
            return product.save();

          case 15:
            res.status(201).json({
              message: '评论成功'
            });
            _context5.next = 20;
            break;

          case 18:
            res.status(404);
            throw new Error("\u67E5\u8BE2\u4E0D\u5230\u4EA7\u54C1");

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}()); // @desc    update single product
// @route   PUT /api/products/:id
// @access  private (only admin)

exports.createProductReviews = createProductReviews;
var updateProduct = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$body2, name, price, description, image, brand, category, countInStock, product, createdProduct;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price, description = _req$body2.description, image = _req$body2.image, brand = _req$body2.brand, category = _req$body2.category, countInStock = _req$body2.countInStock;
            _context6.next = 3;
            return _product["default"].findById(req.params.id);

          case 3:
            product = _context6.sent;

            if (!product) {
              _context6.next = 18;
              break;
            }

            product.name = name;
            product.price = price;
            product.description = description;
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;
            _context6.next = 14;
            return product.save();

          case 14:
            createdProduct = _context6.sent;
            res.status(201).json(createdProduct);
            _context6.next = 20;
            break;

          case 18:
            res.status(404);
            throw new Error("Product Not Found.");

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}()); // @desc    fetch first 3 products
// @route   GET /api/products/top
// @access  public

exports.updateProduct = updateProduct;
var getTopProducts = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var products;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _product["default"].find({}).sort({
              price: 1
            }).limit(3);

          case 2:
            products = _context7.sent;
            res.json(products);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}());
exports.getTopProducts = getTopProducts;