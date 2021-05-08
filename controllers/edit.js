const express = require('express');
const router = express.Router();
const Memes = require('../models/memes.js');
const wholePage = require('./models/newwholepage.js');

//New Route
router.get('/:title/edit', (req, res) => {
    Memes.find({}, (err, editMemes) => {
        res.render('edit/edit.ejs', {
            memes: editMemes[req.params.title]
        });
    })
});



// EXPORT
module.exports = router;