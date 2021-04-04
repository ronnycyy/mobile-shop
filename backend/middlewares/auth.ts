import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import User from '../models/user';


dotenv.config();

const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decode: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      req.user = await User.findById(decode.id).select('-password');
      next();
    } catch (e) {
      res.status(401);
      throw new Error(`error token`);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(`token not found`);
  }

})


export default protect;
