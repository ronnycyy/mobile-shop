"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var conn;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect(process.env.MONGO_URI || 'mongodb+srv://ronny:123@cluster0.7uyw6.mongodb.net/mobile-shop?retryWrites=true&w=majority', {
              useUnifiedTopology: true,
              useNewUrlParser: true,
              useCreateIndex: true
            });

          case 3:
            conn = _context.sent;
            console.log("mongoDB connected. host: ".concat(conn.connection.host).cyan.underline);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("MongoDB Connect Error: ".concat(_context.t0.message).red.underline.bold);
            process.exit(1); // 退出进程，退出码为1

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}();

var _default = connectDB;
exports["default"] = _default;