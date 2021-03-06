import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import connectDB from './config/db';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import orderRoutes from './routes/order';
import uploadRoutes from './routes/upload';
import { errorHandler, notFound } from './middlewares/errorHandler';

colors.enable();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 80;

const app = express();

// 解析body的中间件
app.use(express.json());

if (process.env.NODE_ENV) {
  app.use(morgan('dev'));
}


// const __dirname = path.resolve()

app.use('/', express.static(path.join(__dirname, 'client')));

// app.get('/', (req, res) => {
//   res.send(`welcome to server api`);
// });

// 此处没有调用next，因此中间件不会往下走，除非抛出错误，那样就直接跳errorHandler
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 如果上面的路由都没有匹配到，才会到这个中间件
// 那就说明客户端的请求没有对上任意一个api，即没有找到接口
app.use(notFound);

// 错误处理中间件
// 当next函数传递了参数时，Express将这个参数视为error，并直接跳到错误处理中间件，忽略从发生错误到错误处理中间件的所有其他中间件
// 中间件throw Error的情况，也会直接跳到这里
// 错误处理应该是最后的情况，因此后面不该有其他类型的中间件了
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`模式: "${process.env.NODE_ENV ? process.env.NODE_ENV : 'production'}". 服务运行端口: ${PORT}...`.green.underline.bold);
});
