import { Command } from "../../structures/Command";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
const language = require("../../language");

export default new Command({
    name: "vote",
    description: "vote me to let me grow (:",
    run: async ({ interaction }) => {
    const { guild } = interaction;
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('top.gg!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel('Discord Bot List!')
        .setURL('https://discordbotlist.com/bots/votify/upvote')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel('Disbots!')
        .setURL('https://disbots.net/vote/875678983465885706')
        .setStyle(ButtonStyle.Link),
    );

		interaction.editReply({ content: `${language(guild, "VOTE")}!`, components: [row as any] })
    .catch(err => console.log(err));
    }
});