import {
    APIApplicationCommandOptionChoice,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder
  } from 'discord.js'
export function createSimpleSubcommand(
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
      .addStringOption(createStringOptionWithChoices('server', 'Server to execute command at', true, ...server))
  }
  export function createIntervalSubcommand(
    subcommandName: string,
    subcommandDescription: string
  ) {
    return createSimpleSubcommand(subcommandName, subcommandDescription)
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
  export function createDropSubcommand(
    subcommandName: string,
    subcommandDescription: string
  ) {
    return createSimpleSubcommand(subcommandName, subcommandDescription)
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
 export type choiceArray = APIApplicationCommandOptionChoice<string>[]
  export function createChoiceSubcommand(
    subcommandName: string,
    subcommandDescription: string,
    ...choices: choiceArray
  ) {
    return createSimpleSubcommand(subcommandName, subcommandDescription)
      .addStringOption((args) =>
        args
          .setName('arguments')
          .setDescription('Additional arguments')
          .setRequired(false)
          .addChoices(...choices)
      )
  }
  export function createStringOption(
    name: string,
    description: string,
    required: boolean
  ) {
    return new SlashCommandStringOption()
      .setName(name)
      .setDescription(description)
      .setRequired(required)
  }
  export function createStringOptionWithChoices(
    name: string,
    description: string,
    required: boolean,
    ...choices: choiceArray
  ) {
    return createStringOption(name, description, required).addChoices(...choices)
  }
  export const gamemodes: choiceArray = [
    { name: 'Creative', value: 'creative' },
    { name: 'Survival', value: 'survival' },
    { name: 'Spectator', value: 'spectator' }
  ]
  export const server: choiceArray = [
    { name: 'SMP', value: 'smp' },
    { name: 'CMP', value: 'smp' }
  ]
  
  export const dimensions: choiceArray = [
    { name: 'Overworld', value: 'minecraft:overworld' },
    { name: 'Nether', value: 'minecraft:the_nether' },
    { name: 'End', value: 'minecraft:the_end' }
  ] 
  export const colours: choiceArray = [
    { name: 'Black', value: 'black' },
    { name: 'Blue', value: 'blue' },
    { name: 'Brown', value: 'brown' },
    { name: 'Cyan', value: 'cyan' },
    { name: 'Gray', value: 'gray' },
    { name: 'Green', value: 'green' },
    { name: 'Light Blue', value: 'light_blue' },
    { name: 'Light Gray', value: 'light_gray' },
    { name: 'Lime', value: 'lime' },
    { name: 'Magenta', value: 'magenta' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
    { name: 'Purple', value: 'purple' },
    { name: 'Red', value: 'red' },
    { name: 'Reset', value: 'reset' },
    { name: 'White', value: 'white' },
    { name: 'Yellow', value: 'yellow' }
  ]
