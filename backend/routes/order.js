"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("./../controllers/order");
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var router = express_1.default.Router();
router.route('/').post(auth_1.default, order_1.addOrderItems);
router.route('/:id').get(auth_1.default, order_1.getOrderById);
exports.default = router;
