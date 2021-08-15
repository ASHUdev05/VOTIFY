const {MessageEmbed} = require("discord.js");
const { title } = require("process");
module.exports = {
    name: 'stats',
    execute(message, client) {
        
        if (message.author.bot) return;
        const ToTalSeconds = (message.client.uptime / 1000);
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
        const SystemPing = Math.round(message.client.ws.ping);
        const exampleEmbed = { // new MessageEmbed()
            color : '#b700ff',
            title :"❤️‍🔥 | Bot's Live Status",
            description : "💓 | **Bot Uptime** : ` " + `${Uptime}` + " `"+"\n"+
            //.addField(" \u200B ", "** Bot's Hot Name** :  ` " + OsHostName + " `")
            "🦠 | **Bot Current Version** : `   1.0.0   `"+"\n"+
            "✨ | **Global Bot Prefix** : ` v! `"+"\n"+
            "💽 | **CPU Usage** :  ` " + RamUsage + "Mb `"+"\n"+
            "💾 | **Memory Usage** :  ` " + MemoryUsed + "Mb `"+"\n"+
            "🖥️ | **Bot Platform** :  ` " + BotPlatform + " `"+"\n"+
            "🏓 | **System Ping** :  ` " + SystemPing + " `"+"\n"+
            "🔬 | **Channels** : ` " + `${message.client.channels.cache.size}` + " `"+"\n"+
            "🏘️ | **Servers** : ` " + `${message.client.guilds.cache.size}` + " `"+"\n"+
            "💕 | **Users** : ` " + `${message.client.users.cache.size}` + " `"

            //.setDescription("Bot's Live Status"+"\n"+"las"+"\n"+"sd")
            /*.addField(" \u200B ", "**Bot Uptime** : ` " + `${Uptime}` + " `")
            //.addField(" \u200B ", "** Bot's Hot Name** :  ` " + OsHostName + " `")
            .addField(" \u200B ", "**Bot Current Version** : `   1.0.0   `")
            .addField(" \u200B ", "**Global Bot Prefix** : ` v! `")
            .addField(" \u200B ", "**CPU Usage** :  ` " + RamUsage + "Mb `")
            .addField(" \u200B ", "**Memory Usage** :  ` " + MemoryUsed + "Mb `")
            .addField(" \u200B ", "**Bot Platform** :  ` " + BotPlatform + " `")
            .addField(" \u200B ", "**System Ping** :  ` " + SystemPing + " `")
            .addField(" \u200B ", "**Channels** : ` " + `${message.client.channels.cache.size}` + " `")
            .addField(" \u200B ", "**Servers** : ` " + `${message.client.guilds.cache.size}` + " `")
            .addField(" \u200B ", "**Users** : ` " + `${message.client.users.cache.size}` + " `")*/
        };
        message.channel.send({ embed: exampleEmbed })
            .catch(err => console.log(err));
        // message.channel.send(exampleEmbed);
    
    },
};
