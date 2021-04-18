"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var colors_1 = __importDefault(require("colors"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var db_1 = __importDefault(require("./config/db"));
var product_1 = __importDefault(require("./routes/product"));
var user_1 = __importDefault(require("./routes/user"));
var order_1 = __importDefault(require("./routes/order"));
var upload_1 = __importDefault(require("./routes/upload"));
var errorHandler_1 = require("./middlewares/errorHandler");
colors_1.default.enable();
dotenv_1.default.config();
db_1.default();
var PORT = process.env.PORT || 80;
var app = express_1.default();
// 解析body的中间件
app.use(express_1.default.json());
var __dirname = path_1.default.resolve();
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'web')));
// app.get('/', (req, res) => {
//   res.send(`welcome to server api`);
// });
// 此处没有调用next，因此中间件不会往下走，除非抛出错误，那样就直接跳errorHandler
app.use('/api/products', product_1.default);
app.use('/api/user', user_1.default);
app.use('/api/order', order_1.default);
app.use('/api/upload', upload_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '/uploads')));
// 如果上面的路由都没有匹配到，才会到这个中间件
// 那就说明客户端的请求没有对上任意一个api，即没有找到接口
app.use(errorHandler_1.notFound);
// 错误处理中间件
// 当next函数传递了参数时，Express将这个参数视为error，并直接跳到错误处理中间件，忽略从发生错误到错误处理中间件的所有其他中间件
// 中间件throw Error的情况，也会直接跳到这里
// 错误处理应该是最后的情况，因此后面不该有其他类型的中间件了
app.use(errorHandler_1.errorHandler);
app.listen(PORT, function () {
    console.log(("mode: \"" + process.env.NODE_ENV + "\". server running on http://localhost:" + PORT + "...").green.underline.bold);
});
