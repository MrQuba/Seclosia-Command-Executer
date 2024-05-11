import { SlashCommandBuilder } from 'discord.js';
import { managePlayer } from '../../rcon/rcon';
const { cmpIp, cmpPassword, cmpPort } = require('../../../config.json');
module.exports = {
	 data: new SlashCommandBuilder()
	.setName('player')
	.setDescription('Display or modify whitelist')
	.addSubcommandGroup( group =>
		group
		.addSubcommand(stop =>
		stop
			.setName('stop')
			.setDescription('Stops player actions')
			.addStringOption(name =>
				name.setName('name')
					.setDescription('Player to manage')
					.setRequired(true)
					))
		.addSubcommand(use =>
			use
			.setName('use')
			.setDescription('Makes player use item it is holding / block it is looking at')
			.addStringOption(usetype =>
				usetype.addChoices(
					{ name: 'Once', value: 'once'},
					{ name: 'Continuous', value: "cont"},
					{ name: 'interval', value: 'inter'}
				)
			)
			.addIntegerOption(interval =>
				interval
				.setName('interval')
				.setDescription('Only required for interval option')
				.setRequired(false)
			)
		)
				),
			async execute(interaction: any) {
				let data;
				const serverType: string = cmpIp;
				const port: number = cmpPort;
				const password: string = cmpPassword;
				const subcommand: string = interaction.options.getSubcommand();
				const name: string = interaction.options.getString('name');
				
						
				switch(subcommand){
					case 'stop':
                           data = managePlayer(serverType, port, password, name, subcommand)
						break;
					default: data = 'Wrong action';
				}
					await interaction.reply(`Performed action ${subcommand} on player ${name}`);

			},
};