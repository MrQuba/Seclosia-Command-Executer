import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Sends list of players currently online')
		.addStringOption(option =>
			option.setName('server')
				.setDescription('Players on server')
				.setRequired(true)
				.addChoices(
					{ name: 'SMP', value: 'smp' },
					{ name: 'CMP', value: 'cmp' },
					{ name: 'CMP2', value: 'cmp2' },
				)),
				async execute(interaction: any) {
					let serverType: number;
					let amountOfPlayers: number = -1;
					const option: string = interaction.options.getString('server');
					switch(option){
						case 'smp':
							serverType = 1;
							break;
						case 'cmp':
							serverType = 10;
							break;
						case 'cmp2':
							serverType = 11;
							break;
						default: serverType = -1;
					}
					await interaction.reply(`Players on ${option}: ${amountOfPlayers}`);
				},
};