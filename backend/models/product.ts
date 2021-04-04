import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, require: true },
  rating: { type: Number, require: true },
  comment: { type: String, require: true }
}, {
  timestamps: true
})

// 产品表
const productSchema = new mongoose.Schema({
  user: {   // 归属于谁，本项目中所有产品只属于admin
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {  // 种类
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {  // 评分
    type: Number,
    required: true,
  },
  reviews: [reviewSchema],  // 评论
  numReviews: {  // 评论数量
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {  // 库存
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;
