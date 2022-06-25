import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType, CommandInteractionOptionResolver, Message } from "discord.js";
const emojiArray = require('../../../util/optionArray');
import { pollModel } from "../../../models/poll";
const squigglyRegex = RegExp(/{(.*?)}/);
const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
import moment from 'moment';
const ms = require('ms');
import { EmbedBuilder } from 'discord.js';
const language = require("../../language");

export default new Command({
    name: "poll",
    description: "create a standard multi-option poll!",
    options: [{
        name: "timed_poll",
        description: "Select yes/no",
        type: ApplicationCommandOptionType.Boolean,
        required: true,
    },
    {
        name: "title",
        description: "Enter poll title:",
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "time",
        description: "Enter poll time:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt1",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt2",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt3",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt4",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt5",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt6",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt7",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt8",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt9",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt10",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt11",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt12",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt13",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt14",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt15",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt16",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt17",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt18",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt19",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "opt20",
        description: "Enter option:",
        type: ApplicationCommandOptionType.String,
        required: false,
    },],
    run: async ({ interaction }) => {
        const { guild } = interaction;
        const boolean = (interaction.options as CommandInteractionOptionResolver).getBoolean('timed_poll');
        const string = (interaction.options as CommandInteractionOptionResolver).getString('title');
        const string1 = (interaction.options as CommandInteractionOptionResolver).getString('time');
        const opt1 = (interaction.options as CommandInteractionOptionResolver).getString('opt1');
        const opt2 = (interaction.options as CommandInteractionOptionResolver).getString('opt2');
        const opt3 = (interaction.options as CommandInteractionOptionResolver).getString('opt3');
        const opt4 = (interaction.options as CommandInteractionOptionResolver).getString('opt4');
        const opt5 = (interaction.options as CommandInteractionOptionResolver).getString('opt5');
        const opt6 = (interaction.options as CommandInteractionOptionResolver).getString('opt6');
        const opt7 = (interaction.options as CommandInteractionOptionResolver).getString('opt7');
        const opt8 = (interaction.options as CommandInteractionOptionResolver).getString('opt8');
        const opt9 = (interaction.options as CommandInteractionOptionResolver).getString('opt9');
        const opt10 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt11 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt12 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt13 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt14 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt15 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt16 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt17 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt18 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt19 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
        const opt20 = (interaction.options as CommandInteractionOptionResolver).getString('opt10');
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
        return interaction.editReply(`${language(guild, "POLL_TIME_E")}`).catch(err => console.log(err));
        
        if (!pollTitle) {
            return interaction.editReply(`${language(guild, "POLL_TITLE_E")}`).catch(err => console.log(err));
        }
        if (!pollParameters) {
            return interaction.editReply(`${language(guild, "POLL_OPTION_E")}`).catch(err => console.log(err));
        }
        const pollsArray = pollParameters.match(squareRegex);
        if (pollsArray.length > 20) {
            return interaction.editReply(`${language(guild, "POLL_OPTION_E_1")}`).catch(err => console.log(err));
        }

        let i = 0;
        let args = "{"+string1+"}";
        const pollString = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
        if (timeRegex.exec(args) == undefined) {
            return interaction.editReply(`${language(guild, "POLL_TIME_E")}`).catch(err => console.log(err));
        }
        const timedPoll = (boolean === true) ? timeRegex.exec(args)[1] : null;

    const embed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle(`❔ | ${pollTitle}`)
	.setDescription(`${pollString}`)
	.setThumbnail(interaction.client.user.displayAvatarURL({ extension: 'png' }))
	.setTimestamp()
	.setFooter({
        text: timedPoll ? `${language(guild, "POLL_ENDS_AT")}: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : ''+`| ${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, 
        iconURL: interaction.user.displayAvatarURL({ extension: 'png' })
    });



        await interaction.editReply({ embeds: [embed] }).catch(err => console.log(err));
        const msg = await interaction.fetchReply() as Message;

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
    }
});