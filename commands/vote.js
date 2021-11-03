const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('vote me to let me grow (:'),
	async execute(interaction) {
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

		interaction.reply({ content: `Upvote me on the following Bot Lists!
    \`\`\`Note: Only voting on top.gg gives you premium.  (:\`\`\``, components: [row] });
	},
};
