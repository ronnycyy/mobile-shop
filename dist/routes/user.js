"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

var _auth = require("../middlewares/auth");

var router = _express["default"].Router(); // 注意路由编写顺序，Express会优先匹配写在前面的路由
// 任意用户


router.route('/register').post(_user.registerUser);
router.post('/login', _user.authUser);
router.route('/profile').get(_auth.protect, _user.getUserProfile).put(_auth.protect, _user.updateUserProfile); // 管理员

router.route('/').get(_auth.protect, _auth.isAdmin, _user.getUsers); // 双重中间件保护，protect->isAdmin->visit 登录的用户为管理员才可访问

router.route('/:id')["delete"](_auth.protect, _auth.isAdmin, _user.deleteUser).get(_auth.protect, _auth.isAdmin, _user.getUserById).put(_auth.protect, _auth.isAdmin, _user.updateUser);
var _default = router;
exports["default"] = _default;