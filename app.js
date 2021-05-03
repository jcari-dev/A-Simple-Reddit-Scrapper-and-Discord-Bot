const Discord = require("discord.js");
const client = new Discord.Client();
const token = require('./config');
const fetch = require("node-fetch");

let memearr;

let memepls = () => {

    return fetch("http://meme-api.herokuapp.com/gimme")
        .then(res => {
            return res.json()
        }).then(data => {
            if (data.nsfw === true) {
                return memepls();
            } else {
                memearr = data.preview[data.preview.length - 1]
                return memearr;
            }
        })

}


client.on("ready", () => {

    console.log(`Logged in as ${client.user.tag}!`)

})

client.on("message", msg => {

    if (msg.author.bot) return;

    if (msg.content === "!zm") {

        memepls().then(memearr => msg.reply(`${memearr}`));

    }
})

client.login(token);