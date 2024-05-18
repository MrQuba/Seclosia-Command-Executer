import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { runRconCommand } from '../../rcon/rcon';
const { smpIp, cmpIp, cmp2Ip, smpPassword, cmpPassword, cmp2Password, rconPassword, smpPort, cmpPort, cmp2Port, rconPort } = require('../../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops server')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option =>
			option.setName('server')
				.setDescription('Server to stop')
				.setRequired(true)
				.addChoices(
					{ name: 'SMP', value: 'smp' },
					{ name: 'CMP', value: 'cmp' },
					{ name: 'CMP2', value: 'cmp2' },
				)),
				async execute(interaction: any) {
					let serverType: string;
					let port: number;
					let password: string;
					const server: string = interaction.options.getString('server');
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
					runRconCommand(serverType, port, password, 'stop');
					await interaction.reply(`Stopping ${server}`);
				},
};