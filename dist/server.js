"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const youtubeRoutes_1 = __importDefault(require("./routes/youtubeRoutes"));
const instaRoutes_1 = __importDefault(require("./routes/instaRoutes"));
const stability_client_1 = require("stability-client");
const app = (0, express_1.default)();
// Load environment variables from .env file
dotenv_1.default.config();
(0, db_1.default)();
app.use((0, morgan_1.default)('dev'));
// Use express.json to parse incoming request body as json
app.use(express_1.default.json());
// cors config
if (process.env.CLIENT_ADDRESS) {
    const allowedOrigins = [process.env.CLIENT_ADDRESS];
    const options = {
        origin: allowedOrigins,
    };
    app.use((0, cors_1.default)(options));
}
// Function to define routes for the server
app.use('/api/users', userRoutes_1.default);
app.use('/api/email', emailRoutes_1.default);
app.use('/api/youtube', youtubeRoutes_1.default);
app.use('/api/insta', instaRoutes_1.default);
const apiKey = process.env.ST_DEFUSION_KEY;
app.get('/', (req, res) => {
    const api = (0, stability_client_1.generate)({
        prompt: 'a anime still of an highly detailed night cyberpunk city life, bladerunner style!! detailed shops, neon lights, ray tracing, advertising everywhere, people and robots walking around. art by satoshi kon and studio ghibli, in the style of ghost in the shell, muted colours, hyperrealism, cinematic lighting, lush detail, award winning, wlop, octane render, trending on artstation 4K',
        apiKey: apiKey,
    });
    api.on('image', ({ buffer, filePath }) => {
        console.log('Image', buffer, filePath);
    });
    api.on('end', (data) => {
        console.log('Generating Complete', data);
    });
});
// Use the notFound middleware for 404 errors
app.use(errorMiddleware_1.notFound);
// Use the errorHandler middleware for other errors
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server🤖]: Beep Boop Bop, I am Running at http://localhost:${PORT}⚡️`);
});
