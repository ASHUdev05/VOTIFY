module.exports = {
    name: 'invite',
    execute(message) {
        const embed = {
            color: 'BLUE',
            thumbnail: {
                url: message.client.user.displayAvatarURL({ format: 'png' }),
            },
            description: `
                **Invite VOTIFY to your Server:** https://discord.com/api/oauth2/authorize?client_id=875678983465885706&permissions=140660632640&scope=bot
            `,
        };

        message.channel.send({ embed: embed })
            .catch(err => console.log(err));
    },
    };