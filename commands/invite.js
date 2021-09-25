const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    execute(message, client) {
    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`
    **❤️ | Invite VOTIFY to your Server:** https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=140660632640&scope=bot
`)
	.setThumbnail(message.client.user.displayAvatarURL({ format: 'png' }))
	.setTimestamp()
	.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png' }));

message.channel.send({ embeds: [exampleEmbed] })
    .catch(err => console.log(err));
        
    
    },
    };