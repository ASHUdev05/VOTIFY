const emojiArray = require('../util/optArr');
const pollModel = require('../models/poll');
// const squigglyRegex = RegExp(/{(.*?)}/);
// const squareRegex = RegExp(/\[[^[]+\]/g);
const timeRegex = RegExp(/{(\d+(s|m|h|d|w))}/);
const moment = require('moment');
const ms = require('ms');
// const prefix = 'v!';
const prefix1 = 'v!ynpoll';
module.exports = {
    name: 'ynpoll',
    async execute(message, args) {
        // const pollParameters = args.join(' ');
        // const ags = message.content.trim().split(/ +/g);
        // const pollTitle = ags[0].slice(prefix.length).toLowerCase();
        const gargs = message.content.trim().split(/ +/g);
  let cmd = gargs.join(' ').slice(prefix1.length).toLowerCase();
        // const pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;
       //  console.log(squigglyRegex.exec(pollParameters));

        if (!cmd) {
            return message.channel.send('You need to specify a poll title').catch(err => console.log(err));
        }

        /* pollParameters.replace(`{${pollTitle}}`, '');
        const pollsArray = pollParameters.match(squareRegex);

        if (!pollsArray) {
            return message.channel.send('You need to specify poll options').catch(err => console.log(err));
        }
        else if (pollsArray.length > 20) {
            return message.channel.send('You can\'t have more than 20 poll options.').catch(err => console.log(err));
        }
*/
        let i = 0;
        // const larg = args.length;
        // const pollString = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
        const timedPoll = timeRegex.test(args[0]) ? timeRegex.exec(args[0])[1] : null;
        // pollTitle= pollTitle.slice(timedPoll ? timedPoll.length : 0);
        cmd = cmd.slice(timedPoll ? args[0].length + 1 : 0);
        // message.channel.send(`${args.length}`);
        const embed = {
            color: 'BLUE',
            thumbnail: {
                url: message.client.user.displayAvatarURL({ format: 'png' }),
            },
            title: "❔ | " + cmd,
            description: ' \n\n\n👍 - YES \n\n👎 - NO \n\n 🤷 - IDK ',
            footer: {
                text: timedPoll ? `Ends at: ${moment(Date.now() + ms(timedPoll)).format('LLLL')}` : '',
            },
        };

        const msg = await message.channel.send({ embed: embed }).catch(err => console.log(err));

        if (timedPoll) {
            const pollDoc = new pollModel({
                guild: message.guild.id,
                textChannel: message.channel.id,
                message: msg.id,
                expiryDate: Date.now() + ms(timedPoll),
            });

            await pollDoc.save().catch(err => console.log(err));
        }

        for (i = 0; i < 3; i++) {
            await msg.react(emojiArray()[i]).catch(err => console.log(err));
        }
    },
};