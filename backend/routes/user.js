"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
// 注意路由编写顺序，Express会优先匹配写在前面的路由
// 任意用户
router.route('/register').post(user_1.registerUser);
router.post('/login', user_1.authUser);
router
    .route('/profile')
    .get(auth_1.protect, user_1.getUserProfile)
    .put(auth_1.protect, user_1.updateUserProfile);
// 管理员
router.route('/').get(auth_1.protect, auth_1.isAdmin, user_1.getUsers); // 双重中间件保护，protect->isAdmin->visit 登录的用户为管理员才可访问
router
    .route('/:id')
    .delete(auth_1.protect, auth_1.isAdmin, user_1.deleteUser)
    .get(auth_1.protect, auth_1.isAdmin, user_1.getUserById)
    .put(auth_1.protect, auth_1.isAdmin, user_1.updateUser);
exports.default = router;
