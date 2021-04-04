import asyncHandler from 'express-async-handler';
import ProductModel from '../models/product';

// @desc    fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(
  async (req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
  }
)

// @desc    fetch single product
// @route   GET /api/products/:id
// @access  public
const getProductById = asyncHandler(
  async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      next(new Error(`Product Not Found.`));
    }
  }
)

export { getProducts, getProductById }