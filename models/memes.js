const mongoose = require('mongoose');

const memesSchema = new mongoose.Schema({
    url: { type: String },
    ups: { type: Number, required: true },
    title: { type: String, required: true },
    redditurl: String,
    tcauthor: String,
    tcbody: String,
    tcups: Number,
    pawards: Array,
    pawardsc: Array,
    tcawards: Array,
    tcawardsc: Array,
    posttitle: String,
    entrydate: String,
    subtextbody: String,

}, { timestamps: true });

const Memes = mongoose.model('Memes', memesSchema);

module.exports = Memes;
// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phonenumber: String,
//     state: String

// });

// const appList = mongoose.model('appList', appointmentSchema);

// module.exports = appList;