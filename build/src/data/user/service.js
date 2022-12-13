"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const schema_2 = __importDefault(require("./schema"));
const utils_1 = require("../../utils/utils");
class UserService {
    async findUserByEmail(email, callback) {
        return await schema_1.default.findOne({
            email,
        }, callback).clone();
    }
    async createUser(email, callback) {
        const newUser = new schema_2.default({
            userName: (0, utils_1.getUsername)(email),
            email,
            userType: "USER",
        });
        await newUser.save(callback);
    }
}
exports.default = UserService;
//# sourceMappingURL=service.js.map