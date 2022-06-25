import { Command } from "../../structures/Command";
import { row } from "../../index";
import { MessageEmbed } from "discord.js";
const language = require("../../language");

export default new Command({
    name: "info",
    description: "some facts about me...",
    run: async ({ interaction }) => {
        const { guild } = interaction;
        const infoEmbed = new MessageEmbed()
        .setAuthor("VOTIFY's Info/Credits", interaction.client.user.avatarURL())
        .setColor(0xFF0000)
        .setFooter("✅  ||  embed by VOTIFY")
        .addField(`📝 ${language(guild, "INFO1_CREDITS")}:`, `Bot by ASHUdev05\n`)
            .addField(`📆 ${language(guild, "INFO1_LAUNCHED")}:`, '15th AUGUST , 2021\n')
            .addField(`👪 ${language(guild, "INFO1_TOTAL_USERS")}:`, `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`)
            .addField(`💬 ${language(guild, "INFO1_TOTAL_SERVERS")}:`, `${interaction.client.guilds.cache.size}`)
            .addField(`✅ ${language(guild, "INFO1_OFFICIAL_SERVER")}:`, "https://discord.gg/ZJ9Xts342B")
            .setTimestamp()
            .setFooter(`${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));
      interaction.editReply({ embeds: [infoEmbed], components: [row] }).catch(err => console.log(err));
    }
});