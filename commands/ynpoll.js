const { SlashCommandBuilder } = require('@discordjs/builders');
const emojiArray = require('../util/optArr');
const pollModel = require('../models/poll');
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
const moment = require('moment');
const ms = require('ms');

const prefix1 = 'v!ynpoll';
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ynpoll')
	    .setDescription('create a basic yes-no poll!')
        .addBooleanOption(option => option.setRequired(true).setName('timed_poll').setDescription('Select yes/no'))
        .addStringOption(option => option.setRequired(true).setName('title').setDescription('Enter poll title:'))
        .addStringOption(option => option.setName('time').setDescription('Enter poll time:')),
    
	async execute(interaction) {
        const boolean = interaction.options.getBoolean('timed_poll');
        const string = interaction.options.getString('title');
        const string1 = interaction.options.getString('time');
        //const gargs = message.content.trim().split(/ +/g);
  let cmd = string;//gargs.join(' ').slice(prefix1.length).toUpperCase();
        
        if(boolean && string1==null)
        return interaction.reply('You need to specify a time for a timed poll').catch(err => console.log(err));

        if (!cmd) {
            return interaction.reply('You need to specify a poll title').catch(err => console.log(err));
        }

        
        let i = 0;
        args = "{"+string1+"}";
        console.log(boolean);
        const timedPoll = (boolean === true) ? timeRegex.exec(args)[1] : null;
        console.log(timedPoll);


        const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("❔ | " + cmd)
	.setDescription(' \n\n\n\n\n\n👍 - YES \n\n👎 - NO \n\n 🤷 - IDK ')
	.setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(timedPoll ? `Ends at: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : ''+`| Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));

        
        await interaction.reply({ embeds: [embed] }).catch(err => console.log(err));
        const msg = await interaction.fetchReply();
        //interaction.reply({content:'Poll created!', ephemeral: true}).catch(err => console.log(err));

        if (timedPoll) {
            const pollDoc = new pollModel({
                guild: interaction.guild.id,
                textChannel: interaction.channel.id,
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