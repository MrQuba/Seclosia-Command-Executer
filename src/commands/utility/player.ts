import { SlashCommandBuilder } from 'discord.js';
import { managePlayer } from '../../rcon/rcon';
const { cmpIp, cmpPassword, cmpPort } = require('../../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
	.setName('player')
	.setDescription('Manages players on CMP')
	.addSubcommand(stop =>
		stop
		.setName('stop')
		.setDescription('Stops actions of player')
		.addStringOption(name => 
				name
				.setName('name')
				.setDescription('Name of player to manage')
			))
	.addSubcommand(kill =>
		kill
		.setName('kill')
		.setDescription('Kills player')
		.addStringOption(name => 
			name
			.setName('name')
			.setDescription('Name of player to manage')
			)),
	async execute(interaction: any) {
		const serverType: string = cmpIp;
		const password: string = cmpPassword;
		const port: number = cmpPort;
		const name: string = interaction.options.getString('name');
		const subcommand: string = interaction.options.getSubcommand();
		managePlayer(serverType, port, password, name, subcommand);
		interaction.reply(`${name} ${subcommand}`);
	} 
}