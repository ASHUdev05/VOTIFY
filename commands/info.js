const { MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('wanna know about someone?')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction) {
		const {row} = require('../index');
    const user = interaction.options.getUser('target') || interaction.user;
    const temp = await interaction.guild.members.fetch(user);
    const perm = temp.permissions.toArray();
    if (user != undefined) {
      const userEmbed = new MessageEmbed()
        .setTitle(user.tag)
        .setThumbnail(user.displayAvatarURL({size: 1024}))
        .setColor(0xFF0000)
        .setDescription(`🔢 **ID:** \`${user.id}\`\n\n` +
        `📛 **Nickname:** \`${temp.displayName}\`\n\n` +
        `🤖 **Bot:** \`${user.bot ? "Yes" : "No"}\`\n\n` +
        `🗓️ **Joined Discord on:** \`${user.createdAt}\`\n\n` +
        `💬 **Joined this server on:** \`${temp.joinedAt}\`\n\n` + `🚩 **Roles:** ${temp.roles.cache.map(roles => roles).join(' ')}\n\n` + `🕯️ **Permissions:** \`\`\`${perm.map(perms => perms).join(`,  `)}\`\`\``);
      interaction.reply({ embeds: [userEmbed], components: [row] });
    } 
	},
};
/*
`ℹ️ **Status:** ${interaction.guild.members.cache.get(user.id).presence.status}\n\n` +
+
        
        `🎮 **Playing:** ${interaction.guild.members.cache.get(user.id).presence.activity ? interaction.guild.members.cache.get(interaction.mentions.users.first().id).presence.activity.name : "Nothing"}\n\n`
*/
/*
`ℹ️ **Status:** ${message.guild.members.cache.get(interaction.user.id).presence.status}\n\n` +
+
        
        `🎮 **Playing:** ${message.guild.members.cache.get(interaction.user.id).presence.activity ? message.guild.members.cache.get(interaction.user.id).presence.activity.name : "Nothing"}\n\n`
*/