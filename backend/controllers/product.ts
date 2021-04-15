import asyncHandler from 'express-async-handler';
import Product from '../models/product';
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

// @desc    delete single product
// @route   DELETE /api/products/:id
// @access  private (only admin)
const deleteProductById = asyncHandler(
  async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: '产品删除成功' })
    } else {
      res.status(404);
      next(new Error(`Product Not Found.`));
    }
  }
)

// @desc    create single product
// @route   POST /api/products/:id
// @access  private (only admin)
const createProduct = asyncHandler(
  async (req: any, res, next) => {
    const product = new Product({
      name: '样本名称',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: '样品品牌',
      category: '样品分类',
      countInStock: 0,
      numReviews: 0,
      description: '样品描述',
      rating: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }
)


// @desc    update single product
// @route   PUT /api/products/:id
// @access  private (only admin)
const updateProduct = asyncHandler(
  async (req: any, res, next) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } else {
      res.status(404);
      throw new Error(`Product Not Found.`);
    }

  }
)

export { getProducts, getProductById, deleteProductById, createProduct, updateProduct }
