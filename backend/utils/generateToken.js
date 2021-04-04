"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secret = process.env.JWT_SECRET || '';
var generateToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, secret, {
        expiresIn: '30d'
    });
};
exports.default = generateToken;
