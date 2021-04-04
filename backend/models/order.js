"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// 订单表
var orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [{
            name: { type: String, required: true },
            count: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'Product' },
        }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        province: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentRequest: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        wechatAddress: { type: String },
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    }
});
var Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
