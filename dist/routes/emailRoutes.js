"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const emailController_js_1 = require("../controllers/emailController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
router.post('/thankyou', authMiddleware_js_1.protect, emailController_js_1.emailBody);
router.post('/cancel', authMiddleware_js_1.protect, emailController_js_1.emailBody);
router.post('/subject', authMiddleware_js_1.protect, emailController_js_1.catchySubject);
exports.default = router;
