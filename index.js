const keep_alive = require("./keep_alive");
const { Client, Collection,Intents } = require('discord.js');
const { readdirSync } = require('fs');
const { connect } = require('mongoose');
const { dburl, token, prefix } = require('./config.json');
const fetchAll = require('./util/fetchAll');
const emojiArray = require('./util/optionArray');
const emojiArray1 = require('./util/optArr');
const pollModel = require('./models/poll');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const fetch = require("node-fetch"); // import node-fetch module
const premiumGuildSchema = require("./models/premium");
const day = require("dayjs");


client.commands = new Collection();

const commandFiles = readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Yo this is ready!');
    client.user.setStatus("idle");
    var activities = [ `${client.guilds.cache.size} servers`, `${client.users.cache.size} users!`, `v1.0.0`, 'WATCHING your polls!' ], i = 0;
    setInterval(() => client.user.setActivity(`v!help | ${activities[i++ % activities.length]}`, { type: "PLAYING" }),5000)


    
    
    
    connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log('MongoDB Connected'));

    setInterval(async () => {
        for (const guild of client.guilds.cache) {
            const pollArray = await pollModel.find({
                guild: guild[0],
            }).catch(err => console.log(err));

            for (const poll of pollArray) {
                if (Date.now() >= Number(poll.expiryDate)) {
                    const channel = client.channels.cache.get(poll.textChannel);
                    const msg = await channel.messages.fetch(poll.message).catch(err => console.log(err));

                    const resultsArr = [];
                    const resultsArr1 = [];

                    for (const e of emojiArray()) {
                        const allReactions = await fetchAll(msg, e).catch(err => console.log(err));
                        resultsArr.push([e, typeof allReactions == 'object' ? allReactions.length : undefined]);
                    }
                    for (const e of emojiArray1()) {
                        const allReactions = await fetchAll(msg, e).catch(err => console.log(err));
                        resultsArr1.push([e, typeof allReactions == 'object' ? allReactions.length : undefined]);
                    }
                    resultsArr.sort((a, b) => b[1] - a[1]);
                    resultsArr1.sort((a, b) => b[1] - a[1]);

                    if ((resultsArr[0][1] == resultsArr[1][1]) && (resultsArr1[0][1] == resultsArr1[1][1])) {
                        msg.reply(`It was a tie!`);
                    }
                    else if (resultsArr[0][1] != resultsArr[1][1]) {
                        msg.reply(`The winner of the poll was option ${resultsArr[0][0]}`);
                    }
                    else if (resultsArr1[0][1] != resultsArr1[1][1]) {
                        msg.reply(`The winner of the poll was option ${resultsArr1[0][0]}`);
                    }

                    await poll.deleteOne().catch(err => console.log(err));
                }
            }
        }
    }, 30000);
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `v!premium`)
    {
        const botId = `875678983465885706`; // get the client (bot) id
        const uId = message.author.id; // get the author id

        const url = `https://top.gg/api/bots/${botId}/check?userId=${uId}`; // api endpoint
        fetch(url, { method: "GET", headers: { Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NTY3ODk4MzQ2NTg4NTcwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyMTQ5MTg3fQ.iGXz3CEau8IxfD5eHFgaOeQRAnTK-wX4PfVZyhaGPzk` }})
        .then((res) => res.text())
        .then((json) => {
        let isVoted = JSON.parse(json).voted;

        if (isVoted !== null && isVoted > 0) {
            message.channel.send(`Thank you for voting (:`);
            var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
            var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
            premiumGuildSchema.findOne({
                User: uId
            }, async(err, data) => {
               if(data) message.channel.send(`You have already got rewards for voting in last 24 hours! What you want double premium? (:`);
            
               else {
                   const Expire = day(followingDay).valueOf();
                   new premiumGuildSchema({
                       User: uId,
                       Expire,
                       Permanent: false,
               }).save();
               return message.channel.send(`As a reward we have gien you premium {lasts for 24 hours from now!}`);
            }
        });
        
    }
        else {
        message.channel.send(`You haven't voted yet
        \`Vote now by using 'v!vote'\``);
        }
        console.log(isVoted);
  });
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    try {
        if(cmd.premium) {
            premiumGuildSchema.findOne({
                User: message.author.id
            }, async(err, data) => {
                if(!data)
                return message.channel.send(`This bot is a premium only bot. You can only use \`v!help\` and \`v!vote\` without premium.\nIf you've already voted then use \`v!premium\` to claim your reward.\n\n (To get  24hours of premium vote on top.gg by using the command \`v!vote\` . You can claim premium everyday by voting once every 24 hours.)`);
            if(!data.Permanent && Date.now() > data.Expire) {
                data.delete();
                return message.channel.send(`Your premium has expired 
                \`claim again by voting on top.gg\``);
            }
            if(data) cmd.execute(message, args);
            });
            

        } else cmd.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.channel.send('There was an error trying to execute that command!');
    }

    
});

client.login(token);