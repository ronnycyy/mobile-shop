"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var users = [{
  name: 'admin',
  email: 'admin@example.com',
  password: _bcryptjs["default"].hashSync('123456', 10),
  isAdmin: true
}, {
  name: 'summer',
  email: 'summer@example.com',
  password: _bcryptjs["default"].hashSync('123456', 10),
  isAdmin: false
}, {
  name: 'henry',
  email: 'henry@example.com',
  password: _bcryptjs["default"].hashSync('123456', 10),
  isAdmin: false
}];
var _default = users;
exports["default"] = _default;