import { SlashCommandBuilder } from 'discord.js';
module.exports = {
	data: new SlashCommandBuilder()
		.setName('op')
		.setDescription('Grants operator permissions at specified server')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of player to grant perms')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('at')
					.setDescription('Server to grant perms at')
					.setRequired(true)
					.addChoices(
						{ name: 'CMP', value: 'cmp' },
						{ name: 'CMP2', value: 'cmp2' },
					)
				),
				async execute(interaction: any) {
					let serverType: number;
					const option: string = interaction.options.getString('name');
					const server: string = interaction.options.getString('at');
					switch(server){
						case 'cmp':
							serverType = 10;
							break;
						case 'cmp2':
							serverType = 11;
							break;
						default: serverType = -1;
					}
					await interaction.reply(`Granted **${option}** op perms at **${server}**`);
				},
};