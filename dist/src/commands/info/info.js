"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const index_1 = require("../../index");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: "user-info",
    description: "wanna know about someone?",
    options: [{
            name: "target",
            description: "Select a user",
            type: "USER",
            required: false,
        }],
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('target') || interaction.user;
        const temp = await interaction.guild.members.fetch(user);
        const perm = temp.permissions.toArray();
        if (user != undefined) {
            const userEmbed = new discord_js_1.MessageEmbed()
                .setTitle(user.tag)
                .setThumbnail(user.displayAvatarURL({ size: 1024 }))
                .setColor(0xFF0000)
                .setDescription(`🔢 **ID:** \`${user.id}\`\n\n` +
                `📛 **Nickname:** \`${temp.displayName}\`\n\n` +
                `🤖 **Bot:** \`${user.bot ? "Yes" : "No"}\`\n\n` +
                `🗓️ **Joined Discord on:** \`${user.createdAt}\`\n\n` +
                `💬 **Joined this server on:** \`${temp.joinedAt}\`\n\n` + `🚩 **Roles:** ${temp.roles.cache.map(roles => roles).join(' ')}\n\n` + `🕯️ **Permissions:** \`\`\`${perm.map(perms => perms).join(`,  `)}\`\`\``);
            interaction.editReply({ embeds: [userEmbed], components: [index_1.row] });
        }
    }
});
