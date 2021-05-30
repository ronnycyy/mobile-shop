"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.protect = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../models/user"));

_dotenv["default"].config();

var protect = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decode;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
              _context.next = 14;
              break;
            }

            _context.prev = 1;
            token = req.headers.authorization.split(' ')[1];
            decode = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET || 'default_secret');
            _context.next = 6;
            return _user["default"].findById(decode.id).select('-password');

          case 6:
            req.user = _context.sent;
            next();
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            res.status(401);
            throw new Error("error token");

          case 14:
            if (token) {
              _context.next = 17;
              break;
            }

            res.status(401);
            throw new Error("token not found");

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.protect = protect;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("you are not admin");
  }
};

exports.isAdmin = isAdmin;