const { prefix } = require('../config.json');
const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
let embed = new MessageEmbed();
module.exports = {
    name: 'help',
    execute(message) {
      const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('Upvote us!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Join the support Server!')
        .setURL('https://discord.gg/xT3RrRTEb9')
        .setStyle('LINK'),
    );

        const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('VOTIFY\'s help menu')
	.setDescription(`
    **Polls**
    Create a poll using the command
    \`${prefix}poll {Title} [Option 1] [Option 2] [Option 3]\`

    You can create a poll with an expiry date and end the poll once over
    \`${prefix}poll {Title} {Time} [Option 1] [Option 2] [Option 3]\`
    
    Create a normal yes-no poll using the command
    \`${prefix}ynpoll Question\`
    
    You can create a yes-no poll with an expiry date and end the poll once over
    \`${prefix}ynpoll {Time} Question\`

    **Note:** Each poll can have up to 20 options.

    **To invite VOTIFY:** \`${prefix}invite\`

    **Other Commands**
    ${message.client.commands.filter(c => c.name != 'poll' && c.name != 'ynpoll' && c.name != 'add-premium' && c.name != 'del-premium').map(c => `\`${c.name}\``).join(' ')}

    **Still have Questions:** 
    Join our Support Server : https://discord.gg/g2USBkM4kR
    
    \`\`\`**Note:** This bot is a premium only bot. You can only use \`v!help\` and \`v!vote\` without premium.\`\`\`\n\n \`\`\`(To get  24hours of premium vote on top.gg by using the command \`v!vote\` . You can claim premium everyday by voting once every 24 hours.)\`\`\`
    `)
	.setThumbnail(message.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' }));

message.channel.send({ embeds: [exampleEmbed], components: [row] })
    .catch(err => console.log(err));



    },
};