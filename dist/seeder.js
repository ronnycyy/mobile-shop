"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _colors = _interopRequireDefault(require("colors"));

var _user = _interopRequireDefault(require("./data/user"));

var _products = _interopRequireDefault(require("./data/products"));

var _user2 = _interopRequireDefault(require("./models/user"));

var _product = _interopRequireDefault(require("./models/product"));

var _order = _interopRequireDefault(require("./models/order"));

var _db = _interopRequireDefault(require("./config/db"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_colors["default"].enable();

_dotenv["default"].config();

(0, _db["default"])(); // connect mongoDB first.

var clearDataBase = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _order["default"].deleteMany();

          case 3:
            _context.next = 5;
            return _user2["default"].deleteMany();

          case 5:
            _context.next = 7;
            return _product["default"].deleteMany();

          case 7:
            console.log("mongoDB data cleared.".green.inverse);
            process.exit();
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error("".concat(_context.t0).red.inverse);
            process.exit(1);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function clearDataBase() {
    return _ref.apply(this, arguments);
  };
}();

var initData = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var createdUsers, adminUserId, sampleProducts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _order["default"].deleteMany();

          case 3:
            _context2.next = 5;
            return _user2["default"].deleteMany();

          case 5:
            _context2.next = 7;
            return _product["default"].deleteMany();

          case 7:
            _context2.next = 9;
            return _user2["default"].insertMany(_user["default"]);

          case 9:
            createdUsers = _context2.sent;
            adminUserId = createdUsers[0]._id;
            sampleProducts = _products["default"].map(function (product) {
              return _objectSpread(_objectSpread({}, product), {}, {
                user: adminUserId
              });
            });
            _context2.next = 14;
            return _product["default"].insertMany(sampleProducts);

          case 14:
            console.log("mongoDB data inited.".green.inverse);
            process.exit();
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.error("".concat(_context2.t0).red.inverse);
            process.exit(1);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function initData() {
    return _ref2.apply(this, arguments);
  };
}(); // execute in terminal


if (process.argv[2] === '--clear') {
  clearDataBase();
} else {
  initData();
}