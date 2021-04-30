const Discord = require("discord.js");
const client = new Discord.Client();
const token = require('./config');
const fetch = require("node-fetch");

let memearr;

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        }).then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

let memepls = () => {

    return fetch("http://meme-api.herokuapp.com/gimme")
        .then(res => {
            return res.json()
        }).then(data => {
            memearr = data.preview[data.preview.length - 1]
            return memearr;
        })

}


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.author.bot) return;

    if (msg.content === "!inspire") {
        getQuote().then(quote => msg.reply(quote))
    }
    if (msg.content.includes("zm")) {
        memepls().then(memearr => msg.reply(`${memearr}`));

    }
})

client.login(token);