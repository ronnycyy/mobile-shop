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
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.authUser = exports.registerUser = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var user_1 = __importDefault(require("../models/user"));
var generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc    register user
// @route   POST /api/user/register
// @access  public
var registerUser = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, isUserExisted, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 1:
                isUserExisted = _b.sent();
                if (isUserExisted) {
                    res.status(400);
                    throw new Error("user existed.");
                }
                return [4 /*yield*/, user_1.default.create({ name: name, email: email, password: password })];
            case 2:
                user = _b.sent();
                if (user) {
                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken_1.default(user._id)
                    });
                }
                else {
                    res.status(400);
                    throw new Error("invalid user information.");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.registerUser = registerUser;
// @desc    auth user & get token
// @route   GET /api/user/login
// @access  public
var authUser = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.matchPassword(password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    res.json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken_1.default(user._id)
                    });
                }
                else {
                    res.status(401);
                    throw new Error("auth error.");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.authUser = authUser;
// @desc    get user details after login
// @route   GET /api/user/profile
// @access  private
var getUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.user._id)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    });
                }
                else {
                    res.status(404);
                    throw new Error("user not found.");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUserProfile = getUserProfile;
// @desc    update user details
// @route   PUT /api/user/profile
// @access  private
var updateUserProfile = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updateUser_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.user._id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = req.body.password;
                }
                return [4 /*yield*/, user.save()];
            case 2:
                updateUser_1 = _a.sent();
                res.json({
                    _id: updateUser_1._id,
                    name: updateUser_1.name,
                    email: updateUser_1.email,
                    isAdmin: updateUser_1.isAdmin,
                    token: generateToken_1.default(updateUser_1._id)
                });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error("user not found.");
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.updateUserProfile = updateUserProfile;
// @desc    get all users
// @route   GET /api/user
// @access  private (only admin)
var getUsers = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.find({})];
            case 1:
                users = _a.sent();
                if (users) {
                    res.json(users);
                }
                else {
                    res.status(404);
                    throw new Error("user not found.");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getUsers = getUsers;
// @desc    delete user
// @route   DELETE /api/user/:id
// @access  private (only admin)
var deleteUser = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, user.remove()];
            case 2:
                _a.sent();
                res.json({ message: 'user deleted.' });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error("user not found.");
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.deleteUser = deleteUser;
// @desc    get user info
// @route   GET /api/user/:id 
// @access  private (only admin)
var getUserById = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.params.id).select('-password')];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404);
                    throw new Error("user not found.");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getUserById = getUserById;
// @desc    update user info
// @route   PUT /api/user/:id 
// @access  private (only admin)
var updateUser = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updateUser_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.isAdmin = req.body.isAdmin || user.isAdmin;
                return [4 /*yield*/, user.save()];
            case 2:
                updateUser_2 = _a.sent();
                res.json({
                    _id: updateUser_2._id,
                    name: updateUser_2.name,
                    email: updateUser_2.email,
                    isAdmin: updateUser_2.isAdmin
                });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error("user not found.");
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.updateUser = updateUser;
