import express from 'express';
import { createProduct, deleteProductById, getProductById, getProducts, updateProduct } from '../controllers/product';
import { isAdmin, protect } from '../middlewares/auth';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProductById)
  .put(protect, isAdmin, updateProduct)


export default router;
