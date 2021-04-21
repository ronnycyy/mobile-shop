import asyncHandler from 'express-async-handler';
import Product from '../models/product';
import ProductModel from '../models/product';

// @desc    fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(
  async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
      products,  // 过滤后的产品列表
      page,  // 当前页码
      pages: Math.ceil(count / pageSize)  // 总页码数
    });
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

// @desc    create product review
// @route   POST /api/products/:id/reviews
// @access  private
const createProductReviews = asyncHandler(async (req: any, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // 判断用户是否已评论，如果已评论，不能再评论
    const alreadyReviewed = product.reviews.find((review: any) => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('您已经评论过该产品')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc: any, review: any) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: '评论成功' })
  } else {
    res.status(404);
    throw new Error(`查询不到产品`)
  }
})


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

// @desc    fetch first 3 products
// @route   GET /api/products/top
// @access  public
const getTopProducts = asyncHandler(
  async (req, res, next) => {
    const products = await Product.find({}).sort({ price: 1 }).limit(3);
    res.json(products);
  }
)

export { getProducts, getProductById, deleteProductById, createProduct, updateProduct, createProductReviews, getTopProducts }
