import { Command } from "../../structures/Command";
import { row } from "../../index";
import { MessageEmbed } from 'discord.js';
const language = require("../../language");

export default new Command({
    name: "invite",
    description: "invite me to your place?",
    run: async ({ interaction }) => {
    const { guild } = interaction;
    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`
    **❤️ | ${language(guild, "INVITE")}:** https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=2147740736&scope=bot%20applications.commands
`)
	.setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(`${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));
    
		return interaction.editReply({ embeds: [exampleEmbed], components: [row] })
    .catch(err => console.log(err));
    }
});