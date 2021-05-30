"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var secret = process.env.JWT_SECRET || '';

var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, secret, {
    expiresIn: '30d'
  });
};

var _default = generateToken;
exports["default"] = _default;