const premiumSchema = require("../models/premium");
const {Client, Message, MessageEmbed} = require('discord.js');
const day = require("dayjs");

module.exports = {
    name: 'add-premium',
    enabled: true,
    ownerOnly: false,
    showInHelp: false,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     **/
      execute(message, args, client) {
         if(message.author.id !== '793458406161121300') return;

         const member = 
            message.mentions.users.first() || 
            message.guild.members.cache.get(args[0]);
        
         if(!member) return message.reply("Please specify a valid member!");

         premiumSchema.findOne({
             User: member.id
         }, async(err, data) => {
            if(data) data.delete();
         
            if(args[1]) {
                const Expire = day(args[1]).valueOf();
                new premiumSchema({
                    User: member.id,
                    Expire,
                    Permanent: false,
            }).save();
            } else {
                new premiumSchema({
                    User: member.id,
                    Expire: 0,
                    Permanent: true,
                }).save();
            }
            message.reply("Saved data!");  
            /*new premiumSchema({
                User: member.id,
            }).save();
            return message.reply("Premium features enabled for ${user}!");
        */
        });
        },
    };