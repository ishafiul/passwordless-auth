"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const auth_route_1 = require("../routes/auth.route");
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
app.use(express_1.default.json());
(0, dotenv_1.config)();
app.use((0, cors_1.default)({
    origin: "*"
}));
mongoose_1.default.connect(process.env.MONGO_URL || '').then(() => console.log('connected to mongodb'));
app.get('/', (req, res) => {
    const figlet = require('figlet');
    figlet('C r o s s  -  R o a d', {
        font: 'Doh',
    }, (err, data) => {
        res.send(`<div style='font-size: 10px;margin: auto;
        border: 3px solid #E8E8E8;
        display:flex;
        justify-content: center;
        background-color: #F5F5F5;
        padding: 10px; '><pre>${data} </pre></div>`);
    });
});
app.all('*', (req, res) => {
    res.status(404).json({
        "status": "ERROR",
        "message": "Invalid URL!",
        "code": "404"
    });
});
app.use("/auth", auth_route_1.AuthRouter);
//# sourceMappingURL=app.js.map