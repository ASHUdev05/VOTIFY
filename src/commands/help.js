const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    execute(message) {
        const embed = {
            color: 'BLUE',
            thumbnail: {
                url: message.client.user.displayAvatarURL({ format: 'png' }),
            },
            description: `
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
                ${message.client.commands.filter(c => c.name != 'poll' && c.name != 'ynpoll').map(c => `\`${c.name}\``).join(' ')}

                **Still have Questions:** 
                Join our Support Server : https://discord.gg/WVrpXdD6Nb
            `,
        };

        message.channel.send({ embed: embed })
            .catch(err => console.log(err));
    },
};