const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = 3000;


app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.listen(port, () => {
    console.log('listening on port', port)
});


mongoose.connect('mongodb://localhost:27017/memes', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});