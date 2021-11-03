const premiumSchema = require("../models/premium");
const {Client, Message, MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('del-premium')
		.setDescription('Replies with Pong!')
        .addUserOption(option => option.setRequired(true).setName('target').setDescription('Select a user')),
	async execute(interaction) {
        const user = interaction.options.getUser('target');
        if(interaction.user.id !== '793458406161121300') return;

         const member = user;
           // message.mentions.members.first() || 
           // message.guild.members.cache.get(args[0]);
        
         if(!member) return interaction.reply("Please specify a valid member!");

         premiumSchema.findOne({
             User: member.id
         }, async(err, data) => {
            if(!data) return interaction.reply("This user does not have a premium account!");
            data.delete();
            interaction.reply(`Removed ${member} from database!`);
        });
	},
};
