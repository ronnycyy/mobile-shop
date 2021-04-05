import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateToken from '../utils/generateToken';


// @desc    register user
// @route   POST /api/user/register
// @access  public
const registerUser = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExisted = await User.findOne({ email });
    if (isUserExisted) {
      res.status(400);
      throw new Error(`user existed.`);
    }

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(400);
      throw new Error(`invalid user information.`)
    }
  }
)


// @desc    auth user & get token
// @route   GET /api/user/login
// @access  public
const authUser = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401);
      throw new Error(`auth error.`);
    }
  }
)


// @desc    get user details after login
// @route   GET /api/user/profile
// @access  private
const getUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404);
    throw new Error(`user not found.`);
  }
}


// @desc    update user details
// @route   PUT /api/user/profile
// @access  private
const updateUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id)
    })

  } else {
    res.status(404);
    throw new Error(`user not found.`);
  }
}

// @desc    get all users
// @route   GET /api/user
// @access  private (only admin)
const getUsers = async (req: any, res: Response) => {
  const users = await User.find({});

  if (users) {
    res.json(users)
  } else {
    res.status(404);
    throw new Error(`user not found.`);
  }
}


export { registerUser, authUser, getUserProfile, updateUserProfile, getUsers }
