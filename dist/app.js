"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _colors = _interopRequireDefault(require("colors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _db = _interopRequireDefault(require("./config/db"));

var _product = _interopRequireDefault(require("./routes/product"));

var _user = _interopRequireDefault(require("./routes/user"));

var _order = _interopRequireDefault(require("./routes/order"));

var _upload = _interopRequireDefault(require("./routes/upload"));

var _errorHandler = require("./middlewares/errorHandler");

_colors["default"].enable();

_dotenv["default"].config();

(0, _db["default"])();
var PORT = process.env.PORT || 80;
var app = (0, _express["default"])(); // 解析body的中间件

app.use(_express["default"].json());

if (process.env.NODE_ENV) {
  app.use((0, _morgan["default"])('dev'));
} // const __dirname = path.resolve()


app.use('/', _express["default"]["static"](_path["default"].join(__dirname, 'client'))); // app.get('/', (req, res) => {
//   res.send(`welcome to server api`);
// });
// 此处没有调用next，因此中间件不会往下走，除非抛出错误，那样就直接跳errorHandler

app.use('/api/products', _product["default"]);
app.use('/api/user', _user["default"]);
app.use('/api/order', _order["default"]);
app.use('/api/upload', _upload["default"]);
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, '/uploads'))); // 如果上面的路由都没有匹配到，才会到这个中间件
// 那就说明客户端的请求没有对上任意一个api，即没有找到接口

app.use(_errorHandler.notFound); // 错误处理中间件
// 当next函数传递了参数时，Express将这个参数视为error，并直接跳到错误处理中间件，忽略从发生错误到错误处理中间件的所有其他中间件
// 中间件throw Error的情况，也会直接跳到这里
// 错误处理应该是最后的情况，因此后面不该有其他类型的中间件了

app.use(_errorHandler.errorHandler);
app.listen(PORT, function () {
  console.log("\u6A21\u5F0F: \"".concat(process.env.NODE_ENV ? process.env.NODE_ENV : 'production', "\". \u670D\u52A1\u8FD0\u884C\u7AEF\u53E3: ").concat(PORT, "...").green.underline.bold);
});