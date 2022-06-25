import { Command } from "../../structures/Command";
import { row } from "../../index";
import { MessageEmbed } from "discord.js";
const language = require("../../language");

export default new Command({
    name: "user-info",
    description: "wanna know about someone?",
    options: [{
        name: "target",
        description: "Select a user",
        type: "USER",
        required: false,
    }],
    run: async ({ interaction }) => {
    const { guild } = interaction;
    const user = interaction.options.getUser('target') || interaction.user;
    const temp = await interaction.guild.members.fetch(user);
    const perm = temp.permissions.toArray();
    if (user != undefined) {
      const userEmbed = new MessageEmbed()
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL({ size: 1024 }))
      .setColor(0xFF0000)
      .setDescription(`🔢 **ID:** \`${user.id}\`\n\n` +
      `📛 **${language(guild, "INFO_NICKNAME")}:** \`${temp.displayName}\`\n\n` +
      `🤖 **Bot:** \`${user.bot ? "Yes" : "No"}\`\n\n` +
      `🗓️ **${language(guild, "INFO_JOINED_DISCORD")}:** \`${user.createdAt}\`\n\n` +
      `💬 **${language(guild, "INFO_JOINED_SERVER")}:** \`${temp.joinedAt}\`\n\n` + `🚩 **Roles:** ${temp.roles.cache.map(roles => roles).join(' ')}\n\n` + `🕯️ **${language(guild, "INFO_PERMISSIONS")}:** \`\`\`${perm.map(perms => perms).join(`,  `)}\`\`\``)
      .setTimestamp()
      .setFooter(`${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));
      interaction.editReply({ embeds: [userEmbed], components: [row] });
    } 
    }
});