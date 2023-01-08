"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtubeController_1 = require("../controllers/youtubeController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/idea', youtubeController_1.youtubeIdea);
router.post('/title', youtubeController_1.youtubeTitle);
router.post('/desc', youtubeController_1.youtubeDiscription);
router.post('/script', youtubeController_1.youtubeScript);
exports.default = router;
