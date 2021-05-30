"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.notFound = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var notFound = function notFound(req, res, next) {
  var error = new Error("The request api is not found.");
  res.status(404);
  next(error);
}; // 当中间键接收4个参数时，Express将其视为错误处理程序，并且将第一个参数作为error


exports.notFound = notFound;

var errorHandler = function errorHandler(err, req, res, next) {
  // 会进入这里的都是错误，因此如果Express的响应码还是200，改成500
  var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

exports.errorHandler = errorHandler;