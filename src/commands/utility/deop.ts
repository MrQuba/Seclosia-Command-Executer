import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { changePermissionForPlayer } from '../../rcon/rcon';
const { cmpIp, cmp2Ip, cmpPassword, cmp2Password, rconPassword, cmpPort, cmp2Port, rconPort } = require('../../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('deop')
		.setDescription('Takes away operator permissions at specified server')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
					await interaction.reply(`Made **${option}** no longer operator at **${server}**`);
				},
};