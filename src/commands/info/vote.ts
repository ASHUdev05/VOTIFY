import { Command } from "../../structures/Command";
import { MessageActionRow, MessageButton } from 'discord.js';
const language = require("../../language");

export default new Command({
    name: "vote",
    description: "vote me to let me grow (:",
    run: async ({ interaction }) => {
    const { guild } = interaction;
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('top.gg!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Discord Bot List!')
        .setURL('https://discordbotlist.com/bots/votify/upvote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Disbots!')
        .setURL('https://disbots.net/vote/875678983465885706')
        .setStyle('LINK'),
    );

		interaction.editReply({ content: `${language(guild, "VOTE")}!`, components: [row] })
    .catch(err => console.log(err));
    }
});