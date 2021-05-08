const mongoose = require('mongoose');
const wholePageSchema = new mongoose.Schema({
    purl: { type: String },
    pups: { type: Number, required: true }, // v
    pauthor: { type: String, required: true }, //author: "PensionNo8124",
    predditurl: { type: String }, //url: "https://www.reddit.com/r/dadjokes/comments/n73yui/i_told_my_wife_i_saw_a_deer_on_the_way_to_work/",
    ppawards: Array, // all awardings
    ppawardsc: Array, // count
    pposttitle: String, //  title: "I told my wife I saw a deer on the way to work.",
    pentrydate: String, //date now
    psubtextbody: String, // selftext: "She said how do you know he was headed to work?",
    psubreddit: String, //subreddit: "dadjokes",
    pcollectionname: { type: String, required: true },
    pentrydate: String,
    pimage: String,
    pvideo: String,
    permalink: String
}, { timestamps: true });

const wholePage = mongoose.model('wholePage', wholePageSchema, wholePageSchema.subreddit);

module.exports = wholePage;