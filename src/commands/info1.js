const { MessageEmbed } = require("discord.js");
// const client = new Client();

//var {basename} = require("path");
module.exports = {
    name: 'info',
    /*description: "Test command",
    arguments: [],
    enabled: true,
    ownerOnly: false,
    showInHelp: true,*/

    execute(message, client) {
      //const dev = client.users.resolve(client.config.botOwner).tag;
      //const artist = client.users.resolve("401980971517214723").tag;
      const infoEmbed = new MessageEmbed()
        .setAuthor("VOTIFY's Info/Credits", message.client.user.avatarURL())
        .setColor(0xFF0000)
        .setFooter("✅  ||  embed by VOTIFY")
        .addField("📝 Credits:", `Bot by !NF!N!TY#8699\n`)
        .addField("📆 Launched:", '15th AUGUST , 2021\n')
        .addField("👪 Total Users:", message.client.users.cache.size)
        .addField("💬 Total Servers:", message.client.guilds.cache.size)
        .addField("✅ Official Server:", "https://discord.gg/WVrpXdD6Nb")
        .addField("💻 Source Code:", "Not Available Yet");
      message.channel.send(infoEmbed);
    }
}

