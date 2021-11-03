const {MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { title } = require("process");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('wanna know my stats?'),
	async execute(interaction) {
		const {row} = require('../index');
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

        const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("❤️‍🔥 | Bot's Live Status\n")
	.setDescription("💓 | **Bot Uptime** : ` " + `${Uptime}` + " `"+"\n"+
    //.addField(" \u200B ", "** Bot's Hot Name** :  ` " + OsHostName + " `")
    "🦠 | **Bot Current Version** : `   3.0.0   `"+"\n"+
    "✨ | **Global Bot Prefix** : ` /`"+"\n"+
    "💽 | **CPU Usage** :  ` " + RamUsage + "Mb `"+"\n"+
    "💾 | **Memory Usage** :  ` " + MemoryUsed + "Mb `"+"\n"+
    "🖥️ | **Bot Platform** :  ` " + BotPlatform + " `"+"\n"+
    "🏓 | **System Ping** :  ` " + SystemPing + " `"+"\n"+
    "🔬 | **Channels** : ` " + `${interaction.client.channels.cache.size}` + " `"+"\n"+
    "🏘️ | **Servers** : ` " + `${interaction.client.guilds.cache.size}` + " `"+"\n"+
    "💕 | **Users** : ` " + `${interaction.client.users.cache.size}` + " `")
	.setTimestamp()
	.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));

interaction.reply({ embeds: [exampleEmbed], components: [row] })
    .catch(err => console.log(err));
	},
};