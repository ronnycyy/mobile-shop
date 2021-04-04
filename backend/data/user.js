"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var users = [
    {
        name: 'admin',
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'summer',
        email: 'summer@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'henry',
        email: 'henry@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        isAdmin: false
    },
];
exports.default = users;
