"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiumGuildSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
exports.premiumGuildSchema = mongoose_1.default.model("premium", new mongoose_1.default.Schema({
    User: String,
    Expire: Number,
    Permanent: Boolean,
}));
