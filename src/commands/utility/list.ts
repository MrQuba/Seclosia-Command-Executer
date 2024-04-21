const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Sends list of players currently online'),
	async execute(interaction: { reply: (arg0: string) => any; }) {
		await interaction.reply('This will display list of player currently online');
	},
};