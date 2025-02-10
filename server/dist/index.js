"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development')
});
var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
var app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
