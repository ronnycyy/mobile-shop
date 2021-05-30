import express from 'express';
import { createProduct, createProductReviews, deleteProductById, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/product';
import { isAdmin, protect } from '../middlewares/auth';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/top').get(getTopProducts);
router.route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProductById)
  .put(protect, isAdmin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReviews)


export default router;
