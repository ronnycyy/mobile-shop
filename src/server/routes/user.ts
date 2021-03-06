import express from 'express';
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/user';
import { isAdmin, protect } from '../middlewares/auth';

const router = express.Router();


// 注意路由编写顺序，Express会优先匹配写在前面的路由

// 任意用户
router.route('/register').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)


// 管理员
router.route('/').get(protect, isAdmin, getUsers);  // 双重中间件保护，protect->isAdmin->visit 登录的用户为管理员才可访问
router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)

export default router;
