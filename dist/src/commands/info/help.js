"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const index_1 = require("../../index");
const discord_js_1 = require("discord.js");
let embed = new discord_js_1.MessageEmbed();
exports.default = new Command_1.Command({
    name: "help",
    description: "Are you stuck step-user?",
    run: async ({ interaction }) => {
        const exampleEmbed = new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('VOTIFY\'s help menu')
            .setDescription(`
  Made with ❤️ in 🇮🇳.

  
    **Polls**
    Create a poll using the command
    \`/poll timed_poll:<false> title:<title> <options>\`

    You can create a poll with an expiry date and end the poll once over
    \`/poll timed_poll:<true> title:<title> time:<time>  <options>\`
    
    Create a normal yes-no poll using the command
    \`/ynpoll timed_poll:<false> title:<title>\`
    
    You can create a yes-no poll with an expiry date and end the poll once over
    \`/ynpoll timed_poll:<true> title:<title> time:<time>\`

    **Note:** Each poll can have up to 20 options.

    **To invite VOTIFY:** \`/invite\`

    **Other Commands**
    ${index_1.client.commands.filter(c => c.name != 'poll' && c.name != 'ynpoll' && c.name != 'add-premium' && c.name != 'del-premium').map(c => `\`${c.name}\``).join(' ')}
    
    **Still have Questions:** 
    Join our Support Server : https://discord.gg/ZJ9Xts342B

Check this video(out-dated):
https://youtu.be/8y6xEsFl8Ec
    
    \`\`\`**Note:** This bot is a premium only bot. You can only use \`/help\` and \`/vote\` without premium.\`\`\`\n\n \`\`\`(To get  24hours of premium vote on top.gg by using the command \`/vote\` . You can claim premium everyday by voting once every 24 hours.)\`\`\`
    `)
            .setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png' }))
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: 'png' }));
        interaction.followUp({ embeds: [exampleEmbed], components: [index_1.row] })
            .catch(err => console.log(err));
    },
});
