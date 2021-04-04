import express from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/user';
import protect from '../middlewares/auth';


const router = express.Router();

router.route('/register').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)


export default router;
