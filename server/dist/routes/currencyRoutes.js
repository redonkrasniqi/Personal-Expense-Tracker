"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var currencyController_1 = require("../controllers/currencyController");
var router = express_1.default.Router();
router.get('/', currencyController_1.getCurrencies);
exports.default = router;
