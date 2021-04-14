import express from 'express';
import { deleteProductById, getProductById, getProducts } from '../controllers/product';
import { isAdmin, protect } from '../middlewares/auth';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect, isAdmin, deleteProductById)


export default router;
