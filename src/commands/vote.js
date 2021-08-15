const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
require('discord-buttons')(client);
const disbut = require("discord-buttons");
module.exports = {
    name: 'vote',
    execute(message, client) {
let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://discordbotlist.com/bots/votify/upvote') 
  .setLabel('Discord Bot List!') 

let button2 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://disbots.net/vote/875678983465885706') 
  .setLabel('Disbots!') 

let row = new disbut.MessageActionRow()
  .addComponents(button, button2);

message.channel.send('Upvote me on the following Bot Lists!', row);
    },
};
