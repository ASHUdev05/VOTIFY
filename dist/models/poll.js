"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollModel = void 0;
const { Schema, model } = require('mongoose');
const poll = Schema({
    guild: String,
    textChannel: String,
    message: String,
    expiryDate: Date,
});
exports.pollModel = model('poll', poll);
