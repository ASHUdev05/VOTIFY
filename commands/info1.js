const { MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('some facts about me...'),
	async execute(interaction) {
		const {row} = require('../index');
    const infoEmbed = new MessageEmbed()
        .setAuthor("VOTIFY's Info/Credits", interaction.client.user.avatarURL())
        .setColor(0xFF0000)
        .setFooter("✅  ||  embed by VOTIFY")
        .addField("📝 Credits:", `Bot by !NF!N!TY#8699\n`)
        .addField("📆 Launched:", '15th AUGUST , 2021\n')
        .addField("👪 Total Users:", `${interaction.client.users.cache.size}`)
        .addField("💬 Total Servers:", `${interaction.client.guilds.cache.size}`)
        .addField("✅ Official Server:", "https://discord.gg/ZJ9Xts342B")
        .addField("💻 Source Code:", "Not Available Yet");
      interaction.reply({ embeds: [infoEmbed], components: [row] });
	},
};