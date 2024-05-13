import {
  APIApplicationCommandOptionChoice,
  SlashCommandBuilder,
  SlashCommandStringOption,
  SlashCommandSubcommandBuilder
} from 'discord.js'
import { managePlayer } from '../../rcon/rcon'
const { cmpIp, cmpPassword, cmpPort } = require('../../../config.json')
function createSimpleSubcommand(
  subcommandName: string,
  subcommandDescription: string
) {
  return new SlashCommandSubcommandBuilder()
    .setName(subcommandName)
    .setDescription(subcommandDescription)
    .addStringOption((name) =>
      name
        .setName('name')
        .setDescription('Name of player to manage')
        .setRequired(true)
    )
}
function createIntervalSubcommand(
  subcommandName: string,
  subcommandDescription: string
) {
  return new SlashCommandSubcommandBuilder()
    .setName(subcommandName)
    .setDescription(subcommandDescription)
    .addStringOption((name) =>
      name
        .setName('name')
        .setDescription('Name of player to manage')
        .setRequired(true)
    )
    .addStringOption((args) =>
      args
        .setName('arguments')
        .setDescription('Additional arguments')
        .setRequired(true)
        .addChoices(
          { name: 'Once', value: 'once' },
          { name: 'Continuous', value: 'continuous' },
          { name: 'Interval', value: 'interval' }
        )
    )
    .addStringOption((interval) =>
      interval
        .setName('interval')
        .setDescription(
          'Interval (in ticks), only required for Interval option'
        )
        .setRequired(false)
    )
}
function createDropSubcommand(
  subcommandName: string,
  subcommandDescription: string
) {
  return new SlashCommandSubcommandBuilder()
    .setName(subcommandName)
    .setDescription(subcommandDescription)
    .addStringOption((name) =>
      name
        .setName('name')
        .setDescription('Name of player to manage')
        .setRequired(true)
    )
    .addStringOption((args) =>
      args
        .setName('arguments')
        .setDescription('Additional arguments')
        .setRequired(true)
        .addChoices(
          { name: 'All', value: 'all' },
          { name: 'Continuous', value: 'continuous' },
          { name: 'Interval', value: 'interval' },
          { name: 'Mainhand', value: 'mainhand' },
          { name: 'Offhand', value: 'offhand' },
          { name: 'Once', value: 'once' }
        )
    )
    .addStringOption((interval) =>
      interval
        .setName('interval')
        .setDescription(
          'Interval (in ticks), only required for Interval option'
        )
        .setRequired(false)
    )
}
type choiceArray = APIApplicationCommandOptionChoice<string>[]
function createChoiceSubcommand(
  subcommandName: string,
  subcommandDescription: string,
  ...choices: choiceArray
) {
  return new SlashCommandSubcommandBuilder()
    .setName(subcommandName)
    .setDescription(subcommandDescription)
    .addStringOption((name) =>
      name
        .setName('name')
        .setDescription('Name of player to manage')
        .setRequired(true)
    )
    .addStringOption((args) =>
      args
        .setName('arguments')
        .setDescription('Additional arguments')
        .setRequired(false)
        .addChoices(...choices)
    )
}
function createStringOption(
  name: string,
  description: string,
  required: boolean
) {
  return new SlashCommandStringOption()
    .setName(name)
    .setDescription(description)
    .setRequired(required)
}
function createStringOptionWithChoices(
  name: string,
  description: string,
  required: boolean,
  ...choices: choiceArray
) {
  return createStringOption(name, description, required).addChoices(...choices)
}
const turnChoices: choiceArray = [
  { name: 'Back', value: 'back' },
  { name: 'Left', value: 'left' },
  { name: 'Right', value: 'right' }
]
const moveChoices: choiceArray = [
  { name: 'Backward', value: 'backward' },
  { name: 'Forward', value: 'forward' },
  { name: 'Left', value: 'left' },
  { name: 'Right', value: 'right' }
]
const lookChoices: choiceArray = [
  { name: 'At', value: 'at' },
  { name: 'down', value: 'down' },
  { name: 'east', value: 'east' },
  { name: 'north', value: 'north' },
  { name: 'south', value: 'south' },
  { name: 'up', value: 'up' },
  { name: 'west', value: 'west' }
]
const gamemodes: choiceArray = [
  { name: 'Creative', value: 'creative' },
  { name: 'Survival', value: 'survival' },
  { name: 'Spectator', value: 'spectator' }
]
const spawnSubs: choiceArray = [
  { name: 'At', value: 'at' },
  { name: 'In', value: 'in' }
]

const dimensions: choiceArray = [
  { name: 'Overworld', value: 'minecraft:overworld' },
  { name: 'Nether', value: 'minecraft:the_nether' },
  { name: 'End', value: 'minecraft:the_end' }
]
module.exports = {
  data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Manages players on CMP')
    .addSubcommand(
      createSimpleSubcommand('stop', 'Stops actions of the player')
    )
    .addSubcommand(createSimpleSubcommand('kill', 'Kills player'))
    .addSubcommand(
      createIntervalSubcommand('swaphands', 'Swaps hands of the player')
    )
    .addSubcommand(
      createSimpleSubcommand(
        'hotbar',
        'Changes current slot of the player'
      ).addIntegerOption((slot) =>
        slot.setName('slot').setDescription('Slot to change').setRequired(true)
      )
    )
    .addSubcommand(createDropSubcommand('dropstack', 'Drops stack of items'))
    .addSubcommand(createDropSubcommand('drop', 'Drops item'))
    .addSubcommand(createChoiceSubcommand('mount', 'Mounts entity'))
    .addSubcommand(createSimpleSubcommand('dismount', 'Dismounts entity'))
    .addSubcommand(createSimpleSubcommand('sneak', 'Makes player sneak'))
    .addSubcommand(createSimpleSubcommand('unsneak', 'Makes player unsneak'))
    .addSubcommand(createSimpleSubcommand('sprint', 'Makes player sprint'))
    .addSubcommand(createSimpleSubcommand('unpsrint', 'Makes player unsprint'))
    .addSubcommand(createIntervalSubcommand('use', 'Makes player use item'))
    .addSubcommand(createIntervalSubcommand('jump', 'Makes player jump'))
    .addSubcommand(createIntervalSubcommand('attack', 'Makes player attack'))
    .addSubcommand(
      createChoiceSubcommand('turn', 'Turns player', ...turnChoices)
    )
    .addSubcommand(
      createChoiceSubcommand('move', 'Moves player', ...moveChoices)
    )
    .addSubcommand(
      createChoiceSubcommand(
        'look',
        'Makes player look in specified direction',
        ...lookChoices
      ).addStringOption((coordinates) =>
        coordinates
          .setName('coordinates')
          .setDescription('Coordinates to look at')
          .setRequired(false)
      )
    )
    .addSubcommand(
      createSimpleSubcommand('spawn', 'Spawns player').addStringOption(
        createStringOption(
          'at',
          'Coordinates to spawn player at',
          true
        ))
      .addStringOption(createStringOption('facing', 'Direction (x and z coordinate) player is going to face', true))
      .addStringOption(createStringOptionWithChoices('in', 'Dimension to spawn player in', true, ...dimensions))
      .addStringOption(createStringOptionWithChoices('in2', 'Gamemode to spawn player in', true, ...gamemodes))
    ),
  async execute(interaction: any) {
    const serverType: string = cmpIp
    const password: string = cmpPassword
    const port: number = cmpPort
    const simpleCommands = new Set<string>([
      'stop',
      'kill',
      'dismount',
      'sneak',
      'unsneak',
      'sprint',
      'unsprint'
    ])
    const intervalCommands = new Set<string>(['drop', 'use', 'jump', 'attack'])
    const argumentCommands = new Set<string>(['turn', 'move'])
    const name: string = interaction.options.getString('name')
    let args: string = interaction.options.getString('arguments')
    const interval: string = interaction.options.getString('interval')
    let slot: number = interaction.options.getString('slot')
    const subcommand: string = interaction.options.getSubcommand()
    let skip: boolean = false
    switch (subcommand) {
      case 'swaphands':
        if (args != 'interval')
          managePlayer(serverType, port, password, name, 'swapHands', args)
        else
          managePlayer(
            serverType,
            port,
            password,
            name,
            'swapHands',
            args + ' ' + interval
          )
        break
      case 'hotbar':
        if (slot > 9) slot = 9
        if (slot < 1) slot = 1
        managePlayer(
          serverType,
          port,
          password,
          name,
          subcommand,
          slot.toString()
        )
        break
      case 'dropstack':
        if (args != 'interval')
          managePlayer(serverType, port, password, name, 'dropStack', args)
        else
          managePlayer(
            serverType,
            port,
            password,
            name,
            'dropStack',
            args + ' ' + interval
          )
        break
      case 'mount':
        if (args != 'undefined')
          managePlayer(serverType, port, password, name, subcommand, args)
        else managePlayer(serverType, port, password, name, subcommand)
        break
      case 'look':
        const coordinates: string = interaction.options.getString('coordinates')
        if (args == 'at')
          args = args + ' ' + (coordinates == undefined ? '' : coordinates)
        managePlayer(serverType, port, password, name, subcommand, args)
        break
      case 'spawn':
        args = 'at ' + interaction.options.getString('at') + ' facing ' + interaction.options.getString('facing') + ' in ' + interaction.options.getString('in') + ' in ' + interaction.options.getString('in2')
        managePlayer(serverType, port, password, name, subcommand, args)
        break
      default: {
        if (simpleCommands.has(subcommand))
          managePlayer(serverType, port, password, name, subcommand)
        else if (argumentCommands.has(subcommand))
          managePlayer(serverType, port, password, name, subcommand, args)
        else if (intervalCommands.has(subcommand)) {
          if (args != 'interval')
            managePlayer(serverType, port, password, name, subcommand, args)
          else if (args != 'interval' && interval != 'undefined')
            managePlayer(
              serverType,
              port,
              password,
              name,
              subcommand,
              args + ' ' + interval
            )
        } else {
          interaction.reply('Wrong subcommand')
          skip = true
        }
      }
    }
    if (!skip)
      interaction.reply(
        `${name} ${subcommand} ${args != undefined ? args : ''} ${
          interval != undefined ? interval : ''
        }`
      )
  }
}
