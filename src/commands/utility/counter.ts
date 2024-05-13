import { SlashCommandBuilder } from 'discord.js'
import { changePermissionForPlayer, runRconCommand } from '../../rcon/rcon'
import {
  createStringOptionWithChoices,
  createChoiceSubcommand,
  colours,
  choiceArray
} from '../../utils/CommandUtils'
const action: choiceArray = [
  { name: 'Reset', value: 'reset' },
  { name: 'Realtime', value: 'realtime' }
]
const { cmpIp, cmpPassword, cmpPort } = require('../../../config.json')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('counter')
    .setDescription('Displays or resets counters')
    .addStringOption(
      createStringOptionWithChoices(
        'colour',
        'Choose colour',
        true,
        ...colours
      )
    )
    .addStringOption(
      createStringOptionWithChoices(
        'action',
        'What do to with counter',
        false,
        ...action
      )
    ),
  async execute(interaction: any) {
    let serverType: string = cmpIp
    let port: number = cmpPort
    let password: string = cmpPassword
    const colour: string = interaction.options.getString('colour')
    const action: string = interaction.options.getString('action')
    const data = await runRconCommand(
        serverType,
        port,
        password,
        (action != undefined) ? 'counter ' + colour + ' ' + action : 'counter ' + colour
      )
    await interaction.reply(data)
  }
}
