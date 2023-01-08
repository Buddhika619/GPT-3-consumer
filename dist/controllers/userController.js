"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../Utils/generateToken"));
class UserController {
    // @desc  Auth user & get token
    // @route POST /api/users/login
    // @access Public
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (user && (yield user.matchPassword(password))) {
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: (0, generateToken_1.default)(user._id.toString()),
                });
            }
            else {
                res.status(401);
                throw new Error('Invalid email or password');
            }
        });
    }
    // @desc  Register a new User
    // @route POST /api/users/
    // @access Public
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const userExists = yield userModel_1.default.findOne({ email });
            // If a user with the provided email already exists, send a 400 response and throw an error
            if (userExists) {
                res.status(400);
                throw new Error('User already exists');
            }
            // Create a new user with the provided name, email, and password
            const user = yield userModel_1.default.create(req.body);
            // If the user was created successfully, send a response with the user's information and a JWT token
            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: (0, generateToken_1.default)(user._id.toString()),
                });
            }
            else {
                res.status(400);
                throw new Error('Invalid user data');
            }
        });
    }
    // @desc  Get user profile
    // @route GET /api/users/profile
    // @access Private
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findById(req.user._id);
            // If the user is found, send a response with the user's information
            if (user) {
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                });
            }
            else {
                res.status(404);
                throw new Error('User not found');
            }
        });
    }
}
exports.default = UserController;
