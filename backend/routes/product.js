"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = require("../controllers/product");
var router = express_1.default.Router();
router.route('/').get(product_1.getProducts);
router.route('/:id').get(product_1.getProductById);
exports.default = router;
