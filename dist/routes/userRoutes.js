"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authMiddleware_1 = require("../middleware/authMiddleware");
// Create a new Express router
const router = express_1.default.Router();
// Create a new instance of the UserController
const userController = new userController_1.default();
// register a new user
router.post('/', (0, express_async_handler_1.default)(userController.register));
// POST request to authenticate a user
router.post('/login', (0, express_async_handler_1.default)(userController.auth));
// GET request to get the logged in user's profile
router.get('/userinfo', authMiddleware_1.protect, (0, express_async_handler_1.default)(userController.getProfile));
exports.default = router;
//async handler catch errors and past it to the customer error handler
