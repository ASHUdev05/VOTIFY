const emojiArray = require('../util/optArr');
const pollModel = require('../models/poll');

const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
const moment = require('moment');
const ms = require('ms');

const prefix1 = 'v!ynpoll';
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ynpoll',
    premium: true,
    async execute(message, args) {
        
        const gargs = message.content.trim().split(/ +/g);
  let cmd = gargs.join(' ').slice(prefix1.length).toUpperCase();
        
        if (!cmd) {
            return message.channel.send('You need to specify a poll title').catch(err => console.log(err));
        }

        
        let i = 0;
        
        const timedPoll = timeRegex.test(args[0]) ? timeRegex.exec(args[0])[1] : null;
        cmd = cmd.slice(timedPoll ? args[0].length + 1 : 0);


        const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("❔ | " + cmd)
	.setDescription(' \n\n\n\n\n\n👍 - YES \n\n👎 - NO \n\n 🤷 - IDK ')
	.setThumbnail(message.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(timedPoll ? `Ends at: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : ''+`| Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' }));

        const msg = await message.channel.send({ embeds: [embed] }).catch(err => console.log(err));

        if (timedPoll) {
            const pollDoc = new pollModel({
                guild: message.guild.id,
                textChannel: message.channel.id,
                message: msg.id,
                expiryDate: Date.now() + ms(timedPoll),
            });

            await pollDoc.save().catch(err => console.log(err));
        }

        for (i = 0; i < 3; i++) {
            await msg.react(emojiArray()[i]).catch(err => console.log(err));
        }
    },
};