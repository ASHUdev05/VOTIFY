"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const index_1 = require("../../index");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: "invite",
    description: "invite me to your place?",
    run: async ({ interaction }) => {
        const exampleEmbed = new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`
    **❤️ | Invite VOTIFY to your Server:** https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=2147740736&scope=bot%20applications.commands
`)
            .setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));
        return interaction.editReply({ embeds: [exampleEmbed], components: [index_1.row] })
            .catch(err => console.log(err));
    }
});
