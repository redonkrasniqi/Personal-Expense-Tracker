"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var authenticateJWT = function (req, res, next) {
    var _a;
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    var token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
    if (!token) {
        res.json({ id: null });
        return;
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authenticateJWT = authenticateJWT;
