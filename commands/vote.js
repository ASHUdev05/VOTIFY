const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'vote',
   async execute(message, client) {
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('top.gg!')
        .setURL('https://top.gg/bot/875678983465885706/vote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Discord Bot List!')
        .setURL('https://discordbotlist.com/bots/votify/upvote')
        .setStyle('LINK'),
      new MessageButton()
        .setLabel('Disbots!')
        .setURL('https://disbots.net/vote/875678983465885706')
        .setStyle('LINK'),
    );

		message.channel.send({ content: `Upvote me on the following Bot Lists!
    \`\`\`Note: Only voting on top.gg gives you premium. Once you have voted use 'v!premium' to claim your rewards. Yes you've to redeem premium manually by using 'v!premium' as we dont use magic yet! (:\`\`\``, components: [row] });
    },
};