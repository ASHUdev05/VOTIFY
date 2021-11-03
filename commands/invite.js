const { MessageEmbed  } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('invite me to your place?'),
	async execute(interaction) {
	const {row} = require('../index')
    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`
    **❤️ | Invite VOTIFY to your Server:** https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=2147740736&scope=bot%20applications.commands
`)
	.setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));
    
		return interaction.reply({ embeds: [exampleEmbed], components: [row] })
    .catch(err => console.log(err));
	},
    };