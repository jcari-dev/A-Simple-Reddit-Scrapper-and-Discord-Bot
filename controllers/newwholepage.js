const express = require('express');
const router = express.Router();
const wholePage = require('../models/newwholepage.js');
const app = express();
const methodOverride = require('method-override');
const fetch = require("node-fetch");

let pups;
let pauthor;
let pposttitle;
let psubtextbody;
let psubreddit;
let predditurl;
let ppawards = [];
let ppawardsc = [];
let pentrydate;
let pimage;
let pvideo;
let permalink;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//New Route
router.get('/', (req, res) => {
    res.render('newwholepage/newwholepage.ejs')
});
// Create
router.post('/', (req, res) => {
    fetch(req.body.url + '.json')
        .then(res => res.json())
        .then((out) => {
            console.log(out)

            for (let i = 0; i < out.data.children.length; i++) {

                pups = out.data.children[i].data.ups;
                pauthor = out.data.children[i].data.author;
                pposttitle = out.data.children[i].data.title;
                psubtextbody = out.data.children[i].data.selftext;
                psubreddit = out.data.children[i].data.subreddit_name_prefixed;
                predditurl = out.data.children[i].data.url;
                pimage = out.data.children[i].data.url_overridden_by_dest;
                permalink = ('https://www.reddit.com' + out.data.children[i].data.permalink);
                if (out.data.children[i].data.secure_media !== null) {
                    pvideo = out.data.children[i].data.secure_media.reddit_video.fallback_url.replace(/\?source=fallback/g, '');
                }
                for (let x = 0; x < out.data.children[i].data.all_awardings.length; x++) {
                    ppawards.push(out.data.children[i].data.all_awardings[x].resized_icons[1].url.replace(/amp;/g, ''))
                }
                pvideo = ''
                pimage = ''
                let run = () => {
                    wholePage.create([{ pups: pups, pauthor: pauthor, pcollectionname: req.body.collection, pposttitle: pposttitle, psubtextbody: psubtextbody, psubreddit: psubreddit, predditurl: predditurl, ppawards: ppawards, pentrydate: pentrydate, pimage: pimage, pvideo: pvideo, permalink: permalink }], (error, createdPage) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                    ppawards = [];
                    pvideo = ''
                    pimage = ''
                }
                pentrydate = new Date(Date.now()).toLocaleString();
                run();
            }
            res.redirect('/')
                //     Memes.create([{ title: author, url: imgurl, ups: ups }], (error, createdMeme) => {
                //         if (error) {
                //             console.log(error);
                //         }
                //         res.redirect('/')
                //     })
                //     pawards = [];
                //     pawardsc = [];
                //     tcawards = [];
                //     tcawardsc = [];
                //     imgurl = '';
                //     subtextbody = '';
                // }
        })

})

router.get('/:predditurl/edit', (req, res) => {
    wholePage.find({}, (err, editPage) => {
        res.render('edit/newwholepageedit.ejs', {
            wholepage: editPage[req.params.predditurl]
        });
    })
});
// url: { type: String },
//     pups: { type: Number, required: true }, // v
//     pauthor: { type: String, required: true }, //author: "PensionNo8124",
//     predditurl: { type: String, unique: true }, //url: "https://www.reddit.com/r/dadjokes/comments/n73yui/i_told_my_wife_i_saw_a_deer_on_the_way_to_work/",
//     ppawards: Array, // all awardings
//     ppawardsc: Array, // count
//     pposttitle: String, //  title: "I told my wife I saw a deer on the way to work.",
//     pentrydate: String, //date now
//     psubtextbody: String, // selftext: "She said how do you know he was headed to work?",
//     psubreddit: String, //subreddit: "dadjokes",

// EXPORT
module.exports = router;