const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('know how fast I am working...'),
	async execute(interaction) {
		const {row} = require('../index');
		return interaction.reply({content:`🏓 | API Latency is ${Math.round(interaction.client.ws.ping)}ms`, components: [row]})
            .catch(err => console.log(err));
	},
};