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
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const app = (0, express_1.default)();
// Load environment variables from .env file
dotenv_1.default.config();
(0, db_1.default)();
app.use((0, morgan_1.default)('dev'));
// Use express.json to parse incoming request bodies as json
app.use(express_1.default.json());
// Function to define routes for the server
app.use('/api/users', userRoutes_1.default);
app.use('/api/email', emailRoutes_1.default);
app.get('/', (req, res) => {
    res.send('api is running!');
});
// Use the notFound middleware for 404 errors
app.use(errorMiddleware_1.notFound);
// Use the errorHandler middleware for other errors
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
