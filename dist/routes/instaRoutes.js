"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instaController_1 = require("../controllers/instaController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/caption', instaController_1.instaCaption);
router.post('/product', instaController_1.productShowcase);
router.post('/bio', instaController_1.instaBio);
exports.default = router;
