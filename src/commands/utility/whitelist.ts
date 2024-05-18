import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { getWhitelist, modifyWhitelist } from '../../rcon/rcon';
const { smpIp, cmpIp, cmp2Ip, smpPassword, cmpPassword, cmp2Password, rconPassword, smpPort, cmpPort, cmp2Port, rconPort } = require('../../../config.json');
module.exports = {
	 data: new SlashCommandBuilder()
	.setName('whitelist')
	.setDescription('Display or modify whitelist')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addSubcommand(subcommand =>
		subcommand
			.setName('list')
			.setDescription('Displays whitelist')
			.addStringOption(server =>
				server.setName('server')
					.setDescription('Players on server')
					.setRequired(true)
					.addChoices(
						{ name: 'SMP', value: 'smp' },
						{ name: 'CMP', value: 'cmp' },
						{ name: 'CMP2', value: 'cmp2' },
					)))
	.addSubcommand(subcommand =>
		subcommand
			.setName('add')
			.setDescription('Adds player to the whitelist')
			.addStringOption(server =>
				server.setName('server')
					.setDescription('Players on server')
					.setRequired(true)
					.addChoices(
						{ name: 'SMP', value: 'smp' },
						{ name: 'CMP', value: 'cmp' },
						{ name: 'CMP2', value: 'cmp2' },
					))
			.addStringOption(name =>
				name.setName('name')
					.setDescription('Name of player to grant perms')
					.setRequired(true)
		))
	.addSubcommand(subcommand =>
		subcommand
			.setName('remove')
			.setDescription('Removes player from the whitelist')
			.addStringOption(server =>
				server.setName('server')
					.setDescription('Players on server')
					.setRequired(true)
					.addChoices(
						{ name: 'SMP', value: 'smp' },
						{ name: 'CMP', value: 'cmp' },
						{ name: 'CMP2', value: 'cmp2' },
					))
					.addStringOption(name =>
						name.setName('name')
							.setDescription('Name of player to grant perms')
							.setRequired(true))),
			async execute(interaction: any) {
				let data;
				let serverType: string;
				let password: string;
				let port: number;
				let amountOfPlayers: number = -1;
				const subcommand: string = interaction.options.getSubcommand();
				const server: string = interaction.options.getString('server');
				const name: string = interaction.options.getString('name');
				
				switch(server){
					case 'smp':
						serverType = smpIp;
						port = smpPort;
						password = smpPassword;
						break;
					case 'cmp':
						serverType = cmpIp;
						port = cmpPort;
						password = cmpPassword;
						break;
					case 'cmp2':
						serverType = cmp2Ip;
						port = cmp2Port;
						password = cmp2Password;
						break;
					default: {
						serverType = '127.0.0.1';
						port = rconPort;
						password = rconPassword;
					}
				}
				switch(subcommand){
					case 'list':
                           data = await getWhitelist(serverType, port, password);
						break;
					case 'add':
                           data = await modifyWhitelist(serverType, port, password, name, true);
						break;
					case 'remove':
                           data = await modifyWhitelist(serverType, port, password, name, false);
						break;
					default: data = 'Wrong action';
				}
					await interaction.reply(`${data} on ${server}`);

			},
};