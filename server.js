const { response, json } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const { createIndexes } = require('./models/memes.js');
const Memes = require('./models/memes.js')
const fetch = require("node-fetch");
const methodOverride = require('method-override');
const wholePage = require('./models/newwholepage.js');



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static('public'))

// fetch(parseme).then(res => { return res.json() }).then(data => { memeimg = data[0].children[0].data.thumbnail })


const newMemeController = require('./controllers/new.js');
app.use('/new', newMemeController);

const showMemeController = require('./controllers/memes.js');
app.use('/memes', showMemeController);

const wholePageController = require('./controllers/newwholepage.js')
app.use('/newwholepage', wholePageController);

//Index Page
app.get('/', (req, res) => {
    Memes.find({}, (error, allMemes) => {
        console.log(allMemes)
        wholePage.find({}, (error, allWholePage) => {
            console.log(allWholePage)
            res.render('index.ejs', {
                memes: allMemes,
                wholepage: allWholePage
            })
        })
    })

});



// Delete Route

app.delete('/memes/:title', (req, res) => {
    Memes.deleteOne({ title: req.params.title }, function(err, deletedMemes) {})
    res.redirect('/');
})

app.delete('/newwholepage/:id', (req, res) => {
    wholePage.deleteOne({ _id: req.params.id }, function(err, deleteWPage) {})
    res.redirect('/')
})


mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('linked to mongo')
})




app.listen(port, () => {
    console.log(`Server started on port`);
});