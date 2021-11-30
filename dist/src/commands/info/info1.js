"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const index_1 = require("../../index");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: "info",
    description: "some facts about me...",
    run: async ({ interaction }) => {
        const infoEmbed = new discord_js_1.MessageEmbed()
            .setAuthor("VOTIFY's Info/Credits", interaction.client.user.avatarURL())
            .setColor(0xFF0000)
            .setFooter("✅  ||  embed by VOTIFY")
            .addField("📝 Credits:", `Bot by !NF!N!TY#8699\n`)
            .addField("📆 Launched:", '15th AUGUST , 2021\n')
            .addField("👪 Total Users:", `${interaction.client.users.cache.size}`)
            .addField("💬 Total Servers:", `${interaction.client.guilds.cache.size}`)
            .addField("✅ Official Server:", "https://discord.gg/ZJ9Xts342B")
            .addField("💻 Source Code:", "Not Available Yet");
        interaction.editReply({ embeds: [infoEmbed], components: [index_1.row] }).catch(err => console.log(err));
    }
});
