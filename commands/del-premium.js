const premiumSchema = require("../models/premium");
const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'del-premium',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     **/
     execute(message, args, client) {
         if(message.author.id !== '793458406161121300') return;

         const member = 
            message.mentions.members.first() || 
            message.guild.members.cache.get(args[0]);
        
         if(!member) return message.reply("Please specify a valid member!");

         premiumSchema.findOne({
             User: member.id
         }, async(err, data) => {
            if(!data) return message.reply("This user does not have a premium account!");
            data.delete();
            message.channel.send(`Removed ${member} from database!`);
        });
        },
    };