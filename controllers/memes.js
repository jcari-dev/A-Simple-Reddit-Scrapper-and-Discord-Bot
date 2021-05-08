const express = require('express');
const router = express.Router();
const Memes = require('../models/memes.js');

// Show Route

router.get('/:title', (req, res) => {
    Memes.find({}, (err, foundMemes) => {
        console.log(foundMemes)
        res.render('show/show.ejs', {
            memes: foundMemes[req.params.title]
        });
    })
})

//New Route
router.get('/:title/edit', (req, res) => {
    Memes.find({}, (err, editMemes) => {
        console.log(editMemes + "hey")
        res.render('edit/edit.ejs', {
            memes: editMemes[req.params.title]
        });
    })
});

router.put('/:title', (req, res) => {
    Memes.findOneAndUpdate(req.params.title, req.body, { new: true }, (err, editedMeme) => {
        res.redirect('/');
    })
})

// EXPORT
module.exports = router;