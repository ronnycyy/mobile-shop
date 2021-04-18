"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductReviews = exports.updateProduct = exports.createProduct = exports.deleteProductById = exports.getProductById = exports.getProducts = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var product_1 = __importDefault(require("../models/product"));
var product_2 = __importDefault(require("../models/product"));
// @desc    fetch all products
// @route   GET /api/products
// @access  public
var getProducts = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_2.default.find({})];
            case 1:
                products = _a.sent();
                res.json(products);
                return [2 /*return*/];
        }
    });
}); });
exports.getProducts = getProducts;
// @desc    fetch single product
// @route   GET /api/products/:id
// @access  public
var getProductById = express_async_handler_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_2.default.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (product) {
                    res.json(product);
                }
                else {
                    res.status(404);
                    next(new Error("Product Not Found."));
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getProductById = getProductById;
// @desc    delete single product
// @route   DELETE /api/products/:id
// @access  private (only admin)
var deleteProductById = express_async_handler_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_2.default.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 3];
                return [4 /*yield*/, product.remove()];
            case 2:
                _a.sent();
                res.json({ message: '产品删除成功' });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                next(new Error("Product Not Found."));
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.deleteProductById = deleteProductById;
// @desc    create single product
// @route   POST /api/products/:id
// @access  private (only admin)
var createProduct = express_async_handler_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product, createdProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = new product_1.default({
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
                return [4 /*yield*/, product.save()];
            case 1:
                createdProduct = _a.sent();
                res.status(201).json(createdProduct);
                return [2 /*return*/];
        }
    });
}); });
exports.createProduct = createProduct;
// @desc    create product review
// @route   POST /api/products/:id/reviews
// @access  private
var createProductReviews = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, comment, product, alreadyReviewed, review;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, comment = _a.comment;
                console.log(req.user);
                return [4 /*yield*/, product_1.default.findById(req.params.id)];
            case 1:
                product = _b.sent();
                if (!product) return [3 /*break*/, 3];
                alreadyReviewed = product.reviews.find(function (review) { return review.user.toString() === req.user._id.toString(); });
                if (alreadyReviewed) {
                    res.status(400);
                    throw new Error('您已经评论过该产品');
                }
                review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment: comment,
                    user: req.user._id
                };
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce(function (acc, review) { return acc + review.rating; }, 0) / product.reviews.length;
                return [4 /*yield*/, product.save()];
            case 2:
                _b.sent();
                res.status(201).json({ message: '评论成功' });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error("\u67E5\u8BE2\u4E0D\u5230\u4EA7\u54C1");
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.createProductReviews = createProductReviews;
// @desc    update single product
// @route   PUT /api/products/:id
// @access  private (only admin)
var updateProduct = express_async_handler_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, description, image, brand, category, countInStock, product, createdProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, description = _a.description, image = _a.image, brand = _a.brand, category = _a.category, countInStock = _a.countInStock;
                return [4 /*yield*/, product_1.default.findById(req.params.id)];
            case 1:
                product = _b.sent();
                if (!product) return [3 /*break*/, 3];
                product.name = name;
                product.price = price;
                product.description = description;
                product.image = image;
                product.brand = brand;
                product.category = category;
                product.countInStock = countInStock;
                return [4 /*yield*/, product.save()];
            case 2:
                createdProduct = _b.sent();
                res.status(201).json(createdProduct);
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error("Product Not Found.");
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.updateProduct = updateProduct;
