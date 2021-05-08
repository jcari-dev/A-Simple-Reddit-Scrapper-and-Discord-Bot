const express = require('express');
const router = express.Router();
const Memes = require('../models/memes.js');
const app = express();
const methodOverride = require('method-override');
const fetch = require("node-fetch");

let imgurl;
let author;
let ups;
let redditurl;
let tcauthor;
let tcbody;
let tcups;
let pawards = [];
let pawardsc = [];
let posttitle;
let tcawards = [];
let tcawardsc = [];
let entrydate;
let subtextbody;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//New Route
router.get('/', (req, res) => {
    res.render('new/new.ejs')
});
// Create
router.post('/', (req, res) => {
    fetch(req.body.url + '.json')
        .then(res => res.json())
        .then((out) => {
            let run = () => {
                if (out[0].data.children[0].data.over_18 === true || out[0].data.children[0].data.thumbnail === 'nsfw') {
                    res.send(`<p style="text-align:center;"> Sorry no NSFW or Over 18 Content Here! Thanks :) <br><br><br> <a href='/'>Click Here to Back to the Main Page</a></p>`)

                } else {
                    if (req.body.details === 'on') {
                        Memes.create([{ title: author, url: imgurl, ups: ups, redditurl: redditurl, tcauthor: tcauthor, tcbody: tcbody, tcups: tcups, pawards: pawards, pawardsc: pawardsc, posttitle: posttitle, tcawards: tcawards, tcawardsc: tcawardsc, entrydate: entrydate, subtextbody: subtextbody }], (error, createdMeme) => {
                            if (error) {
                                console.log(error);
                            }
                            res.redirect('/')
                        })
                        pawards = [];
                        pawardsc = [];
                        tcawards = [];
                        tcawardsc = [];
                        imgurl = '';
                        subtextbody = '';
                    } else {
                        Memes.create([{ title: author, url: imgurl, ups: ups }], (error, createdMeme) => {
                            if (error) {
                                console.log(error);
                            }
                            res.redirect('/')
                        })
                        pawards = [];
                        pawardsc = [];
                        tcawards = [];
                        tcawardsc = [];
                        imgurl = '';
                        subtextbody = '';
                    }
                }
            }
            if (out[1].data.children[0].data.author === 'AutoModerator' || out[1].data.children[0].data.author === 'rMemesMods') {

                imgurl = out[0].data.children[0].data.url;
                author = out[0].data.children[0].data.author;
                ups = out[0].data.children[0].data.ups;
                redditurl = ('https://www.reddit.com' + out[1].data.children[1].data.permalink);
                tcauthor = out[1].data.children[1].data.author;
                tcbody = out[1].data.children[1].data.body;
                tcups = out[1].data.children[1].data.score;
                posttitle = out[0].data.children[0].data.title
                for (i = 0; i < out[0].data.children[0].data.all_awardings.length; i++) {
                    pawards.push(out[0].data.children[0].data.all_awardings[i].resized_icons[1].url.replace(/amp;/g, ''))
                    pawardsc.push(out[0].data.children[0].data.all_awardings[i].count)
                }
                for (j = 0; j < out[1].data.children[1].data.all_awardings.length; j++) {
                    tcawards.push(out[1].data.children[1].data.all_awardings[j].resized_icons[1].url.replace(/amp;/g, ''))
                    tcawardsc.push(out[1].data.children[1].data.all_awardings[j].count)
                }
                entrydate = new Date(Date.now()).toLocaleString();
                // console.log(pawards[0], pawards[1])
                run();
            } else {
                console.log('hi')
                if (out[0].data.children[0].data.selftext === '') {
                    imgurl = out[0].data.children[0].data.url;

                    console.log('hi2')
                } else {
                    subtextbody = out[0].data.children[0].data.selftext;
                    console.log(out[0].data.children[0].data.selftext)
                }
                console.log(subtextbody)
                    // imgurl = out[0].data.children[0].data.url;
                author = out[0].data.children[0].data.author;
                ups = out[0].data.children[0].data.ups;
                redditurl = ('https://www.reddit.com' + out[1].data.children[1].data.permalink);
                tcauthor = out[1].data.children[0].data.author;
                tcbody = out[1].data.children[0].data.body;
                tcups = out[1].data.children[0].data.score;
                posttitle = out[0].data.children[0].data.title
                for (i = 0; i < out[0].data.children[0].data.all_awardings.length; i++) {
                    pawards.push(out[0].data.children[0].data.all_awardings[i].icon_url)
                    pawardsc.push(out[0].data.children[0].data.all_awardings[i].count)
                }
                for (j = 0; j < out[1].data.children[0].data.all_awardings.length; j++) {
                    tcawards.push(out[1].data.children[0].data.all_awardings[j].icon_url)
                    tcawardsc.push(out[1].data.children[0].data.all_awardings[j].count)
                }
                entrydate = new Date(Date.now()).toLocaleString();
                // console.log(pawards)
                run();
            }
        })
})

// EXPORT
module.exports = router;