const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('logs...'),
	async execute(interaction) {
		if(interaction.user.id !== '793458406161121300') return;
    var textFile = fs.readFileSync('./logs.txt', {"encoding": "utf-8"});
      try {
      interaction.client.channels.cache.get('899650670444052500').send(textFile);
      } catch (e)
      {
        console.log(e);
      }
	},
};

