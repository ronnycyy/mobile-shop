"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var auth_1 = __importDefault(require("../middlewares/auth"));
var router = express_1.default.Router();
router.route('/register').post(user_1.registerUser);
router.post('/login', user_1.authUser);
router
    .route('/profile')
    .get(auth_1.default, user_1.getUserProfile)
    .put(auth_1.default, user_1.updateUserProfile);
exports.default = router;
