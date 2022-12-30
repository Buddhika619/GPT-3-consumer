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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a new Mongoose schema for a user
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
//create method on the User schema to check if an entered password matches the hashed password
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
//function to hash the user's password before saving it to the database
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // If the password field hasn't been modified, go to the next middleware
        if (!this.isModified('password')) {
            next();
        }
        // Generate a salt for the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        // Hash the password using the generated salt
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
// This creates users doucment in mongodb
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
// import mongoose, { Schema, Document } from 'mongoose';
// import bcrypt from 'bcryptjs'
// // Create an interface for the user document
// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
//   matchPassword(enteredPassword: string): Promise<boolean>;
// }
// // Create a new Mongoose schema for a user
// const userSchema: Schema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isAdmin: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// )
// //create method on the User schema to check if an entered password matches the hashed password
// userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
//   return await bcrypt.compare(enteredPassword, this.password)
// }
// //function to hash the user's password before saving it to the database
// userSchema.pre('save', async function (next) {
//   // If the password field hasn't been modified, go to the next middleware
//   if (!this.isModified('password')) {
//     next()
//   }
//   // Generate a salt for the password
//   const salt = await bcrypt.genSalt(10)
//   // Hash the password using the generated salt
//   this.password = await bcrypt.hash(this.password, salt)
// })
// // This creates users doucment in mongodb
// const User = mongoose.model('User', userSchema)
// export default User
