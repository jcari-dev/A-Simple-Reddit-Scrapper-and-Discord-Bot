const mongoose = require('mongoose');

const memesSchema = new mongoose.Schema({
    url: { type: String, required: true },
    ups: { type: Number, required: true }
    // nsfw: { type: Boolean, default: false, required: [true] }

}, { timestamps: true });

const Memes = mongoose.model('Memes', memesSchema);

module.exports = Memes;