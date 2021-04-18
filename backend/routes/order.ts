import { addOrderItems, getOrderById, getOrders } from './../controllers/order';
import express from 'express';
import { isAdmin, protect } from '../middlewares/auth';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
