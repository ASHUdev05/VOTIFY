const keep_alive = require("./keep_alive");
const { fs, readdirSync } = require('fs');
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { connect } = require('mongoose');
const { dburl, token, prefix } = require('./config.json');
const fetchAll = require('./util/fetchAll');
const emojiArray = require('./util/optionArray');
const emojiArray1 = require('./util/optArr');
const pollModel = require('./models/poll');
const fetch = require("node-fetch"); // import node-fetch module
const premiumGuildSchema = require("./models/premium");
const day = require("dayjs");
const Topgg = require("@top-gg/sdk");
const express = require("express");


const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_MESSAGES] });
// Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, 

const { AutoPoster } = require('topgg-autoposter')
const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NTY3ODk4MzQ2NTg4NTcwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyMTQ5MTg3fQ.iGXz3CEau8IxfD5eHFgaOeQRAnTK-wX4PfVZyhaGPzk' , client)
const app = express();
const webhook = new Topgg.Webhook("Z5iMkSohfFtuq9Bpii911KilDizp1i3CSl");


module.exports.row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('Upvote us!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Join the support Server!')
        .setURL('https://discord.gg/ZJ9Xts342B')
        .setStyle('LINK'),
    );
 const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('Upvote us!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Join the support Server!')
        .setURL('https://discord.gg/ZJ9Xts342B')
        .setStyle('LINK'),
    );


app.post("/dblwebhook", webhook.listener(async vote => {
	// vote will be your vote object, e.g
	console.log(vote.user);// 395526710101278721 < user who voted\
	var temp = await client.users.fetch(vote.user);
  
  let server = client.guilds.cache.get('898945196019056661');
  var memberRole= server.roles.cache.find(role => role.name === "top.gg_VOTERS");
  let member = server.members.cache.get(temp.id);
  try {
  await member.roles.add(memberRole);
  } catch(e){
	console.log(e);
  }
	client.channels.cache.get('899650683052122142').send(`${temp.tag} has voted!`);
	temp.send(`Thank you for voting (:`);
			  var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
			  var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
			  premiumGuildSchema.findOne({
				  User: vote.user
			  }, async(err, data) => {
				
				 if(data){ try {
				   temp.send({content:`You have already got rewards for voting in last 24 hours! What you want double premium? 
  Anyways thanks for voting in less than 24 hours (:
  
  
  \`Note: If you have voted then you can get a special role in VOTIFY's support server. 
  (:\``, components: [row]});
				} catch (e){console.log(e);}
			  }
				 else {
					 const Expire = day(followingDay).valueOf();
					 new premiumGuildSchema({
						 User: vote.user,
						 Expire,
						 Permanent: false,
				 }).save();
				 try {
				 return temp.send({content:`As a reward we have given you premium {lasts for 24 hours from now!}
  
  
  \`Note: If you have voted then you can get a special role in VOTIFY's support server. 
  (:\``, components: [row]});
				 } catch (e) {console.log(e);}
			  }
		  });
	// You can also throw an error to the listener callback in order to resend the webhook after a few seconds
  }))
  
  app.listen(2200);


  ap.on('posted', () => {
	console.log('Posted stats to Top.gg!')
  })


client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
const commandFiles1 = readdirSync('./guildcommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
for (const file of commandFiles1) {
	const command1 = require(`./guildcommands/${file}`);
	client.commands.set(command1.data.name, command1);
}

client.once('ready', () => {
	console.log('Ready!');
  client.user.setStatus("idle");
  var activities = [ `${client.guilds.cache.size} servers`, `${client.users.cache.size} users!`, `v3.0.0`, 'WATCHING your polls!' ], i = 0;
    setInterval(() => client.user.setActivity(`\/help | ${activities[i++ % activities.length]}`, { type: "PLAYING" }),5000)


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
 try{                       msg.reply({content:`It was a tie!`, components:[row1]});
    }catch (e){ console.error(e);}
                    }
                    else if (resultsArr[0][1] != resultsArr[1][1]) {
 try{                     msg.reply({content:`The winner of the poll was option ${resultsArr[0][0]}`, components:[row1]});
    }catch (e){console.error(e)}
                    }
                    else if (resultsArr1[0][1] != resultsArr1[1][1]) {
  try{                   msg.reply({content:`The winner of the poll was option ${resultsArr1[0][0]}`, components:[row1]});
     }catch (e){console.error(e)}
                    }

                    await poll.deleteOne().catch(err => console.log(err));
                }
            }
        }
    }, 30000);

});


client.on('messageCreate', async message => {
      if(message.content.startsWith(`v!`)) message.reply({content: `We Came Back Stronger this time and have switched to slash commands completely (;
      
      use \/ to enjoy the same old features with new flavour!\n\n**NOTE**: The slash commands might not appear for you. Is it true? Don't worry we got you, we understand the mystical unknown error and have hired the power of the greatest eastern witch, she's here to help you. According to her, she suggests us to follow the below magical steps: "just invite the bot again through this link: https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=2147740736&scope=bot%20applications.commands"\n\n The witch's magic didn't work? Join the support server for further help and more magical potions (;`, components: [row1]});
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try { console.log(interaction.commandName);
            premiumGuildSchema.findOne({
                User: interaction.user.id
            }, async(err, data) => {
                if(!data && interaction.commandName!=`claim-premium`&&interaction.commandName!=`help` &&interaction.commandName!=`vote`){
                  await interaction.deferReply();
                  try {
                 
                await interaction.editReply({
                  content:`This bot is a premium only bot. You can only use \`/help\` and \`/vote\` without premium.\nIf you've already voted then use \`/premium\` to claim your reward.\n\n (To get  24hours of premium vote on top.gg by using the command \`/vote\` . You can claim premium everyday by voting once every 24 hours.)`, 
                  components: [row1]
                  });
                }catch (e)
                {
                    console.log(e);
                } 
                }         
                else if(interaction.commandName!=`claim-premium` && interaction.commandName!=`vote` && interaction.commandName!=`help` && !data.Permanent && Date.now() > data.Expire) {
                data.delete();
              try {
await interaction.author.roles.remove(memberRole);
              } catch(e){
                console.log(e);
              }
                await interaction.deferReply();
                await interaction.editReply({content:`Your premium has expired :(
                \`claim again by voting on top.gg\`\nIf already voted use \/claim-premium to redeem rewards!`, components: [row1]});
            }
            if(data || interaction.commandName===`claim-premium` || interaction.commandName===`vote` || interaction.commandName===`help`) await command.execute(interaction);
            });
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);