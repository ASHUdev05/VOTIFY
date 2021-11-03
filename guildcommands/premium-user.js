const premiumSchema = require("../models/premium");
const {Client, Message, MessageEmbed} = require('discord.js');
const day = require("dayjs");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-premium')
		.setDescription('Replies with Pong!')
        .addUserOption(option => option.setRequired(true).setName('target').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('target');
		if(interaction.user.id !== '793458406161121300') return;

         const member = user;
        
         if(!member) return message.reply("Please specify a valid member!");

         premiumSchema.findOne({
             User: member.id
         }, async(err, data) => {
            if(data) data.delete();
         
             
                new premiumSchema({
                    User: member.id,
                    Expire: 0,
                    Permanent: true,
                }).save();
            
            interaction.reply("Saved data!");  
        });
	},
};