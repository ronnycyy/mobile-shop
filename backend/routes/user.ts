import express from 'express';
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/user';
import { isAdmin, protect } from '../middlewares/auth';

const router = express.Router();

router.route('/').get(protect, isAdmin, getUsers);  // 双重中间件保护，protect->isAdmin->visit 登录的用户为管理员才可访问
router.route('/register').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)


export default router;
