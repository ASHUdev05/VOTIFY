const emojiArray = require('../util/optionArray');
const pollModel = require('../models/poll');
const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
const moment = require('moment');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('create a standard multi-option poll!')
        .addBooleanOption(option => option.setRequired(true).setName('timed_poll').setDescription('Select yes/no'))
        .addStringOption(option => option.setRequired(true).setName('title').setDescription('Enter poll title:'))
        .addStringOption(option => option.setName('time').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt1').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt2').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt3').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt4').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt5').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt6').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt7').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt8').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt9').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt10').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt11').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt12').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt13').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt14').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt15').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt16').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt17').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt18').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt19').setDescription('Enter option:'))
        .addStringOption(option => option.setName('opt20').setDescription('Enter option:')),
	async execute(interaction) {
        const boolean = interaction.options.getBoolean('timed_poll');
        const string = interaction.options.getString('title');
        const string1 = interaction.options.getString('time');
        const opt1 = interaction.options.getString('opt1');
        const opt2 = interaction.options.getString('opt2');
        const opt3 = interaction.options.getString('opt3');
        const opt4 = interaction.options.getString('opt4');
        const opt5 = interaction.options.getString('opt5');
        const opt6 = interaction.options.getString('opt6');
        const opt7 = interaction.options.getString('opt7');
        const opt8 = interaction.options.getString('opt8');
        const opt9 = interaction.options.getString('opt9');
        const opt10 = interaction.options.getString('opt10');
        const opt11 = interaction.options.getString('opt10');
        const opt12 = interaction.options.getString('opt10');
        const opt13 = interaction.options.getString('opt10');
        const opt14 = interaction.options.getString('opt10');
        const opt15 = interaction.options.getString('opt10');
        const opt16 = interaction.options.getString('opt10');
        const opt17 = interaction.options.getString('opt10');
        const opt18 = interaction.options.getString('opt10');
        const opt19 = interaction.options.getString('opt10');
        const opt20 = interaction.options.getString('opt10');
		let pollParameters
        if (opt1!= null) pollParameters+= "["+opt1+"] ";
        if (opt2!= null) pollParameters+= "["+opt2+"] ";
        if (opt3!= null) pollParameters+= "["+opt3+"] ";
        if (opt4!= null) pollParameters+= "["+opt4+"] ";
        if (opt5!= null) pollParameters+= "["+opt5+"] ";
        if (opt6!= null) pollParameters+= "["+opt6+"] ";
        if (opt7!= null) pollParameters+= "["+opt7+"] ";
        if (opt8!= null) pollParameters+= "["+opt8+"] ";
        if (opt9!= null) pollParameters+= "["+opt9+"] ";
        if (opt10!= null) pollParameters+= "["+opt10+"] ";
        if (opt11!= null) pollParameters+= "["+opt11+"] ";
        if (opt12!= null) pollParameters+= "["+opt12+"] ";
        if (opt13!= null) pollParameters+= "["+opt13+"] ";
        if (opt14!= null) pollParameters+= "["+opt14+"] ";
        if (opt15!= null) pollParameters+= "["+opt15+"] ";
        if (opt16!= null) pollParameters+= "["+opt16+"] ";
        if (opt17!= null) pollParameters+= "["+opt17+"] ";
        if (opt18!= null) pollParameters+= "["+opt18+"] ";
        if (opt19!= null) pollParameters+= "["+opt19+"] ";
        if (opt20!= null) pollParameters+= "["+opt20+"] ";

    
        
        const pollTitle = string;

        if(boolean && string1==null)
        return interaction.reply('You need to specify a time for a timed poll').catch(err => console.log(err));
        
        if (!pollTitle) {
            return interaction.reply('You need to specify a poll title').catch(err => console.log(err));
        }
        if (!pollParameters) {
            return interaction.reply('You need to specify poll options').catch(err => console.log(err));
        }
        const pollsArray = pollParameters.match(squareRegex);
        if (pollsArray.length > 20) {
            return interaction.reply('You can\'t have more than 20 poll options.').catch(err => console.log(err));
        }

        let i = 0;
        args = "{"+string1+"}";
        const pollString = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
        const timedPoll = (boolean === true) ? timeRegex.exec(args)[1] : null;

    const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`❔ | ${pollTitle}`)
	.setDescription(`${pollString}`)
	.setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(timedPoll ? `Ends at: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : ''+`| Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));



        await interaction.reply({ embeds: [embed] }).catch(err => console.log(err));
        const msg = await interaction.fetchReply();

        if (timedPoll) {
            const pollDoc = new pollModel({
                guild: interaction.guild.id,
                textChannel: interaction.channel.id,
                message: msg.id,
                expiryDate: Date.now() + ms(timedPoll),
            });

            await pollDoc.save().catch(err => console.log(err));
        }

        for (i = 0; i < pollsArray.length; i++) {
            await msg.react(emojiArray()[i]).catch(err => console.log(err));
        }
	},
};