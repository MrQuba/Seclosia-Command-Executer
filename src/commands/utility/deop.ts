import { SlashCommandBuilder } from 'discord.js';
import { changePermissionForPlayer } from '../../rcon/rcon';
const { smpIp, cmpIp, cmp2Ip, smpPassword, cmpPassword, cmp2Password, rconPassword, smpPort, cmpPort, cmp2Port, rconPort } = require('../../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('deop')
		.setDescription('Takes away operator permissions at specified server')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of player to take away perms from')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('at')
					.setDescription('Server to take away perms at')
					.setRequired(true)
					.addChoices(
						{ name: 'CMP', value: 'cmp' },
						{ name: 'CMP2', value: 'cmp2' },
					)
				),
				async execute(interaction: any) {
					let serverType: string;
					let port: number;
					let password: string;
					const option: string = interaction.options.getString('name');
					const server: string = interaction.options.getString('at');
					switch(server){
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
					const data = changePermissionForPlayer(serverType, port, password, option, false);
					await interaction.reply(`Made **${option}** no longer operator at **${server}**`);
				},
};