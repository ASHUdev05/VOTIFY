const { Schema, model } = require('mongoose');

const poll = Schema({
    guild: String,
    textChannel: String,
    message: String,
    expiryDate: Date,
});

export const pollModel = model('poll', poll);