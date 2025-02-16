"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env')
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/transaction', transactionRoutes_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
