import { Command } from "../../structures/Command";
const emojiArray = require("../../../util/optArr");
import { pollModel } from "../../../models/poll"
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
import moment from "moment";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
const ms = require("ms");

export default new Command({
    name: "ynpoll",
    description: "create a basic yes-no poll!",
    options: [{
        name: "timed_poll",
        description: "Select yes/no",
        type: "BOOLEAN",
        required: true,
    },
    {
        name: "title",
        description: "Enter poll title:",
        type: "STRING",
        required: true,
    },
    {
        name: "time",
        description: "Enter poll time:",
        type: "STRING",
        required: false,
    }],

    run: async ({ interaction }) => {
        const boolean = interaction.options.getBoolean('timed_poll');
        const string = interaction.options.getString('title');
        const string1 = interaction.options.getString('time');
        //const gargs = message.content.trim().split(/ +/g);
  let cmd = string;//gargs.join(' ').slice(prefix1.length).toUpperCase();
        
        if(boolean && string1==null)
        return interaction.editReply('You need to specify a time for a timed poll').catch(err => console.log(err));

        if (!cmd) {
            return interaction.editReply('You need to specify a poll title').catch(err => console.log(err));
        }

        
        let i = 0;
        let args = "{"+string1+"}";
        const timedPoll = (boolean === true) ? timeRegex.exec(args)[1] : null;


        const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("❔ | " + cmd)
	.setDescription(' \n\n\n\n\n\n👍 - YES \n\n👎 - NO \n\n 🤷 - IDK ')
	.setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(timedPoll ? `Ends at: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : ''+`| Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));

        
        await interaction.editReply({ embeds: [embed] }).catch(err => console.log(err));
        const msg = await interaction.fetchReply() as Message;
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
    }
});