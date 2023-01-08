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
exports.youtubeScript = exports.youtubeDiscription = exports.youtubeTitle = exports.youtubeIdea = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const openai_1 = __importDefault(require("../config/openai"));
// @des  youtube
// @route POST /api/youtube/idea
// @access private
const youtubeIdea = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myObj = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
    };
    const prompt = `unique and radical idea for youtube video about ${myObj.reason} with ${myObj.tone} emotion`;
    const result = yield (0, openai_1.default)('text-davinci-003', prompt, 1, 250, 2);
    res.status(200).json({ result });
}));
exports.youtubeIdea = youtubeIdea;
// @des  youtube
// @route POST /api/youtube/title
// @access private
const youtubeTitle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myObj = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
    };
    const prompt = `unique and radical youtube video title about ${myObj.reason} with ${myObj.tone} emotion`;
    const result = yield (0, openai_1.default)('text-davinci-003', prompt, 1, 80, 2);
    res.status(200).json({ result });
}));
exports.youtubeTitle = youtubeTitle;
// @des  youtube
// @route POST /api/youtube/desc
// @access private
const youtubeDiscription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myObj = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
    };
    const prompt = `Genearte greate youtube video description about ${myObj.reason} with ${myObj.tone} emotion`;
    const result = yield (0, openai_1.default)('text-davinci-003', prompt, 1, 250, 2);
    res.status(200).json({ result });
}));
exports.youtubeDiscription = youtubeDiscription;
// @des  youtube
// @route POST /api/youtube/script
// @access private
const youtubeScript = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myObj = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
    };
    const prompt = `List greate youtube script outline about ${myObj.reason} with ${myObj.tone} emotion`;
    const result = yield (0, openai_1.default)('text-davinci-003', prompt, 1, 250, 2);
    res.status(200).json({ result });
}));
exports.youtubeScript = youtubeScript;
