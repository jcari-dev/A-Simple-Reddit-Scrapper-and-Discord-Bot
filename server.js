const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const { createIndexes } = require('./models/memes.js');
const Memes = require('./models/memes.js')
const fetch = require("node-fetch");
const axios = require('axios');

app.use(express.urlencoded({ extended: true }));

let aww;

// fetch(parseme).then(res => { return res.json() }).then(data => { memeimg = data[0].children[0].data.thumbnail })


//Index Page
app.get('/', (req, res) => {
    Memes.find({}, (error, allMemes) => {
        // console.log(allMemes.url)
        aww = allMemes.url;
        axios({
                method: 'get',
                url: aww,
            })
            .then(function(response) {
                console.log(response[0].kind)
            });

        res.render('index.ejs', {
            memes: allMemes

        })
    })
});

//New Route
app.get('/new', (req, res) => {
    res.render('new/new.ejs')
});
// Create
app.post('/', (req, res) => {
    Memes.create(req.body, (error, createdMeme) => {
        console.log(createdMeme.url)
        if (error) {
            console.log(error);
        }
        res.redirect('/')
    })
})





mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('linked to mongo')
})












app.listen(port, () => {
    console.log(`Server started on port`);
});