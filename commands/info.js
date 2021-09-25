const { MessageEmbed } = require("discord.js");

// var {basename} = require("path");
module.exports = {
    name: 'user-info',
    premium: true,
    //description: "Test command",
   // arguments: [],
    //enabled: true,
    //ownerOnly: false,
    //showInHelp: true,

    execute(message) {
      if (message.mentions.users.first() !== undefined) {
        const userEmbed = new MessageEmbed()
          .setTitle(message.mentions.users.first().tag)
          .setThumbnail(message.mentions.users.first().displayAvatarURL({size: 1024}))
          .setColor(0xFF0000)
          .setDescription(`🔢 **ID:** \`${message.mentions.users.first().id}\`\n\n` +
          `📛 **Nickname:** ${message.mentions.members.first().displayName}\n\n` +
          `🤖 **Bot:** ${message.mentions.users.first().bot ? "Yes" : "No"}\n\n` +
          `🗓️ **Joined Discord on:** \`${message.mentions.users.first().createdAt}\`\n\n` +
          `💬 **Joined this server on:** \`${message.mentions.members.first().joinedAt}\`\n\n` +
          `ℹ️ **Status:** ${message.guild.members.cache.get(message.mentions.users.first().id).presence.status}\n\n` +
          `🎮 **Playing:** ${message.guild.members.cache.get(message.mentions.users.first().id).presence.activity ? message.guild.members.cache.get(message.mentions.users.first().id).presence.activity.name : "Nothing"}\n\n`);
        message.channel.send({ embeds: [userEmbed] });
      } else {
        const userEmbed = new MessageEmbed()
          .setTitle(message.author.tag)
          .setThumbnail(message.author.displayAvatarURL({size: 1024}))
          .setColor(0xFF0000)
          .setDescription(`🔢 **ID:** \`${message.author.id}\`\n\n` +
          `📛 **Nickname:** ${message.member.displayName}\n\n` +
          `🤖 **Bot:** ${message.author.bot ? "Yes" : "No"}\n\n` +
          `🗓️ **Joined Discord on:** \`${message.author.createdAt}\`\n\n` +
          `💬 **Joined this server on:** \`${message.member.joinedAt}\`\n\n` +
          `ℹ️ **Status:** ${message.guild.members.cache.get(message.author.id).presence.status}\n\n` +
          `🎮 **Playing:** ${message.guild.members.cache.get(message.author.id).presence.activity ? message.guild.members.cache.get(message.author.id).presence.activity.name : "Nothing"}\n\n`);
        message.channel.send({ embeds: [userEmbed] });
      }
    }
}

