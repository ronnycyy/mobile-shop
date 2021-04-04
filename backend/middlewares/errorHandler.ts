import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`The request api is not found.`);
  res.status(404);
  next(error);
}

// 当中间键接收4个参数时，Express将其视为错误处理程序，并且将第一个参数作为error
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // 会进入这里的都是错误，因此如果Express的响应码还是200，改成500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

export { notFound, errorHandler }
