import { addOrderItems, getOrderById } from './../controllers/order';
import express from 'express';
import protect from '../middlewares/auth';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
