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
exports.getOrders = exports.getOrderById = exports.addOrderItems = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var order_1 = __importDefault(require("../models/order"));
// @desc    add order
// @route   POST /api/order
// @access  private
var addOrderItems = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, order, createOrder;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, orderItems = _a.orderItems, shippingAddress = _a.shippingAddress, paymentMethod = _a.paymentMethod, itemsPrice = _a.itemsPrice, shippingPrice = _a.shippingPrice, totalPrice = _a.totalPrice;
                if (!(orderItems && orderItems.length === 0)) return [3 /*break*/, 1];
                res.status(400);
                throw new Error("No Product In Order.");
            case 1:
                order = new order_1.default({
                    user: req.user._id,
                    orderItems: orderItems,
                    shippingAddress: shippingAddress,
                    paymentMethod: paymentMethod,
                    itemsPrice: itemsPrice,
                    shippingPrice: shippingPrice,
                    totalPrice: totalPrice
                });
                return [4 /*yield*/, order.save()];
            case 2:
                createOrder = _b.sent();
                res.status(201).json(createOrder);
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.addOrderItems = addOrderItems;
// @desc    get order by id
// @route   GET /api/order/:id
// @access  private
var getOrderById = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.default.findById(req.params.id).populate('user', 'name email')];
            case 1:
                order = _a.sent();
                if (order) {
                    res.json(order);
                }
                else {
                    res.status(404);
                    throw new Error("Order Not Found");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getOrderById = getOrderById;
// @desc    get all orders
// @route   GET /api/orders
// @access  private (only admin)
var getOrders = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.default.find({}).populate('user', 'id name')];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); });
exports.getOrders = getOrders;
