import { Command } from "../../structures/Command";
import { row } from "../../index";
import { EmbedBuilder } from "discord.js";
const language = require("../../language");

export default new Command({
    name: "stats",
    description: "wanna know my stats?",
    run: async ({ interaction }) => {
        const { guild } = interaction;
        const ToTalSeconds = (interaction.client.uptime / 1000);
        const Days = Math.floor(ToTalSeconds / 86400);
        const Hours = Math.floor(ToTalSeconds / 3600);
        const Minutes = Math.floor(ToTalSeconds / 60);
        const Seconds = Math.floor(ToTalSeconds % 60);
        const Uptime = `${Days} Days, ${Hours} Hours, ${Minutes} Minutes & ${Seconds} Seconds`;
        const MemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const RamUsed = Math.round(process.cpuUsage().system) / 1024;
        const RamUsage = Math.trunc(RamUsed);
        const BotPlatform = process.platform;
        const MemoryUsed = Math.trunc(MemoryUsage);
        const Os = require('os');
        const OsHostName = Os.hostname();
        const SystemPing = Math.round(interaction.client.ws.ping);

        const exampleEmbed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle(`❤️‍🔥 | ${language(guild, "STATS_TITLE")}\n`)
	.setDescription(`💓 | **${language(guild, "STATS_UPTIME")}** : \` ` + `${Uptime}` + " `" + "\n" +
    `🖥️ | **${language(guild, "STATS_HOSTNAME")}** :  \` ` + OsHostName + " `" + "\n" +
    `🦠 | **${language(guild, "STATS_CURR_V")}** : \`   2207   \`` + "\n" +
    `✨ | **${language(guild, "STATS_PREFIX")}** : \` / \`` + "\n" +
    `💽 | **${language(guild, "STATS_CPU")}** :  \` ` + RamUsage + "Mb `" + "\n" +
    `💾 | **${language(guild, "STATS_MEM")}** :  \` ` + MemoryUsed + "Mb `" + "\n" +
    `🖥️ | **${language(guild, "STATS_PLAT")}** :  \` ` + BotPlatform + " `" + "\n" +
    `🏓 | **${language(guild, "STATS_PING")}** :  \` ` + SystemPing + " `" + "\n" +
    `🔬 | **${language(guild, "STATS_CHANNEL")}** : \` ` + `${interaction.client.channels.cache.size}` + " `" + "\n" +
    `🏘️ | **${language(guild, "STATS_SERVER")}** : \` ` + `${interaction.client.guilds.cache.size}` + " `" + "\n" +
    `💕 | **${language(guild, "STATS_USER")}** : \` ` + `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}` + " `")
    .setTimestamp()
    .setFooter({
        text: `${language(guild, "REQUESTED_BY")} ${interaction.user.tag}`, 
        iconURL: interaction.user.displayAvatarURL({ extension: 'png' })
    })

    interaction.editReply({ embeds: [exampleEmbed], components: [row as any] })
    .catch(err => console.log(err));
    }
});