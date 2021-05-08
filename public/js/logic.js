let url;

let wholepageurl;

let store = () => {
    url = document.getElementById('urlfetch').value + '.json';
    lefetch();
}

let lefetch = () => {
    fetch(url).then(res => {
        return console.log(res.body);
    })
}
let wholepagestore = () => {
    wholepageurl = document.getElementById('wholepageurlfetch').value + '.json';
    wholepagelefetch();
}

let wholepagelefetch = () => {
    fetch(url).then(res => {
        return console.log(res.body);
    })
}


// const Discord = require("discord.js");
// const client = new Discord.Client();
// const token = require('./config');
// const fetch = require("node-fetch");

// let memearr;

// let memepls = () => {

// return fetch("http://meme-api.herokuapp.com/gimme")
//     .then(res => {
//         return res.json()
//     }).then(data => {
//         if (data.nsfw === true) {
//             return memepls();
//         } else {
//             memearr = data.preview[data.preview.length - 1]
//             return memearr;
//         }
//     })

// }


// client.on("ready", () => {

//     console.log(`Logged in as ${client.user.tag}!`)

// })

// client.on("message", msg => {

//     if (msg.author.bot) return;

//     if (msg.content === "!zm") {

//         memepls().then(memearr => msg.reply(`${memearr}`));

//     }
// })

// client.login(token);


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://meuser:Lkq#VC@aU_i6BHj@cluster0.3xxlz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });