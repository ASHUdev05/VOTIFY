import { Command } from "../../structures/Command";
import { row } from "../../index";
import { EmbedBuilder } from "discord.js";
const language = require("../../language");

export default new Command({
    name: "info",
    description: "some facts about me...",
    run: async ({ interaction }) => {
        const { guild } = interaction;
        const infoEmbed = new EmbedBuilder()
        .setAuthor({ name:"VOTIFY's Info/Credits", iconURL:interaction.client.user.avatarURL()})
        .setColor(0xFF0000)
        .setFooter({ text:"✅  ||  embed by VOTIFY"})
        .addFields([
            { name: `📝 ${language(guild, "INFO1_CREDITS")}:`, value: `Bot by ASHUdev05\n`},
            { name: `📆 ${language(guild, "INFO1_LAUNCHED")}:`, value: '15th AUGUST , 2021\n'},
            { name: `👪 ${language(guild, "INFO1_TOTAL_USERS")}:`, value: `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`},
            { name: `💬 ${language(guild, "INFO1_TOTAL_SERVERS")}:`, value: `${interaction.client.guilds.cache.size}`},
            { name: `✅ ${language(guild, "INFO1_OFFICIAL_SERVER")}:`, value: "https://discord.gg/ZJ9Xts342B"}])
            .setTimestamp()
            .setFooter({ text:`${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, iconURL:interaction.user.displayAvatarURL({ extension: 'png' })});
      interaction.editReply({ embeds: [infoEmbed], components: [row as any] }).catch(err => console.log(err));
    }
});