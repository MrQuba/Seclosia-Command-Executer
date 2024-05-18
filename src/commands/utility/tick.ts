import { SlashCommandBuilder } from 'discord.js'
import { runRconCommand } from '../../rcon/rcon'
import {
  createStringOptionWithChoices,
  choiceArray,
  createStringOption
} from '../../utils/CommandUtils'
const { cmpIp, cmpPassword, cmpPort, memberRoleId } = require('../../../config.json')

const subcommands: choiceArray = [
   {name: "status", value: "status"},
   {name: "deep", value: "deep"},
   {name: "on", value: "on"},
   {name: "off", value: "off"},
]

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tick')
    .setDescription('Displays or resets counters')
    .addSubcommand(warp => warp
      .setName('warp')
      .setDescription('Tick warp command')
      .addStringOption(createStringOption('ticks', 'Time in ticks to warp', true))
    )
    .addSubcommand(rate =>
      rate
      .setName('rate')
      .setDescription('Change tick rate')
      .addStringOption(createStringOption('ticks', 'New tick rate', true))
    )
    .addSubcommand(step =>
      step
      .setName('step')
      .setDescription('Steps given amount of ticks')
      .addStringOption(createStringOption('ticks', 'Ticks to step', true))
    )
    .addSubcommand(hot =>
      hot
      .setName('superhot')
      .setDescription('I have no clue what this does')
    )
    .addSubcommand(freeze =>
      freeze
      .setName('freeze')
      .setDescription('Manages whether ticks are freezed or not')
      .addStringOption(createStringOptionWithChoices('sub', 'subcommands of tick freeze', true, ...subcommands))
    ),
  async execute(interaction: any) {
    if (!interaction.member.roles.cache.has(memberRoleId)) {
    return interaction.reply('You do not have the required role to use this command.');
    }
    let serverType: string = cmpIp
    let port: number = cmpPort
    let password: string = cmpPassword
    const subcommand: string = ((interaction.options.getSubcommand() == 'superhot') ? 'superHot' : interaction.options.getSubcommand());
    const args: string = interaction.options.getString('ticks')
    const freeze_args: string = interaction.options.getString('sub')
    const command: string = ((freeze_args != undefined) ? ('tick ' + subcommand + (' ' + freeze_args)) :  ('tick ' + subcommand +  ((args != undefined) ? (' ' + args) : "")))
    const data = await runRconCommand(
        serverType,
        port,
        password,
        command
      )
    await interaction.reply(data)
  }
}
