import { SlashCommandBuilder } from 'discord.js';
import { runRconCommand } from '../../rcon/rcon';
const { smpIp, cmpIp, cmp2Ip, smpPassword, cmpPassword, cmp2Password, rconPassword, smpPort, cmpPort, cmp2Port, rconPort, memberRoleId } = require('../../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('mspt')
		.setDescription('Displays miliseconds per tick')
		.addStringOption(option =>
			option.setName('switch')
				.setDescription('switch between on/off')
				.setRequired(true)
				.addChoices(
					{ name: 'yes', value: 'yes' },
					{ name: 'no', value: 'no' },
				))
		.addStringOption(option =>
			option.setName('server')
				.setDescription('on server')
				.setRequired(true)
				.addChoices(
					{ name: 'SMP', value: 'smp' },
					{ name: 'CMP', value: 'cmp' },
					{ name: 'CMP2', value: 'cmp2' },
				)),
				async execute(interaction: any) {
				if (!interaction.member.roles.cache.has(memberRoleId)) {
				return interaction.reply('You do not have the required role to use this command.');
				}
					let serverType: string;
					let port: number;
					let password: string;
					const server: string = interaction.options.getString('server');
					const switchTracking: string = interaction.options.getString('switch');
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
						const data = await runRconCommand(serverType, port, password, (switchTracking == 'yes' ) ? "seclosia enable mspt" : "seclosia get mspt");
						await interaction.reply(`${data} on ${server}`);
				},
};