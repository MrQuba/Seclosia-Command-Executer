import { SlashCommandBuilder } from "discord.js";
import { managePlayer } from "../../rcon/rcon";
const { cmpIp, cmpPassword, cmpPort } = require("../../../config.json");
// code needs refactoring
module.exports = {
  data: new SlashCommandBuilder()
    .setName("player")
    .setDescription("Manages players on CMP")
    .addSubcommand((stop) =>
      stop
        .setName("stop")
        .setDescription("Stops actions of player")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((kill) =>
      kill
        .setName("kill")
        .setDescription("Kills player")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((swapHands) =>
      swapHands
        .setName("swaphands")
        .setDescription("Swaps hands of player")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "Once", value: "once" },
              { name: "Continuous", value: "continuous" },
              { name: "Interval", value: "interval" }
            )
        )
        .addStringOption((interval) =>
          interval
            .setName("interval")
            .setDescription(
              "Interval (in ticks), only required for Interval option"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((hotbar) =>
      hotbar
        .setName("hotbar")
        .setDescription("Changes current slot")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addIntegerOption((slot) =>
          slot
            .setName("slot")
            .setDescription("Slot to change")
            .setRequired(true)
        )
    )
    .addSubcommand((dropStack) =>
      dropStack
        .setName("dropstack")
        .setDescription("Drops all currently held items")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "All", value: "all" },
              { name: "Continuous", value: "continuous" },
              { name: "Interval", value: "interval" },
              { name: "Mainhand", value: "mainhand" },
              { name: "Offhand", value: "offhand" },
              { name: "Once", value: "once" }
            )
        )
        .addStringOption((interval) =>
          interval
            .setName("interval")
            .setDescription(
              "Interval (in ticks), only required for Interval option"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((drop) =>
      drop
        .setName("drop")
        .setDescription("Drops currently held item")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("args")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "All", value: "all" },
              { name: "Continuous", value: "continuous" },
              { name: "Interval", value: "interval" },
              { name: "Mainhand", value: "mainhand" },
              { name: "Offhand", value: "offhand" },
              { name: "Once", value: "once" }
            )
        )
        .addStringOption((interval) =>
          interval
            .setName("interval")
            .setDescription(
              "Interval (in ticks), only required for Interval option"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((mount) =>
      mount
        .setName("mount")
        .setDescription("Mounts entity")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(false)
            .addChoices({ name: "Anything", value: "anything" })
        )
    )
    .addSubcommand((dismount) =>
      dismount
        .setName("dismount")
        .setDescription("Dismounts entity")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((sneak) =>
      sneak
        .setName("sneak")
        .setDescription("Makes player sneak")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((unsneak) =>
      unsneak
        .setName("unsneak")
        .setDescription("Makes player unsneak")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((sprint) =>
      sprint
        .setName("sprint")
        .setDescription("Makes player sprint")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((unsprint) =>
      unsprint
        .setName("unsprint")
        .setDescription("Makes player unsprint")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
    )
    .addSubcommand((use) =>
      use
        .setName("use")
        .setDescription("Makes player use currently held item")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "Once", value: "once" },
              { name: "Continuous", value: "continuous" },
              { name: "Interval", value: "interval" }
            )
        )
        .addStringOption((interval) =>
          interval
            .setName("interval")
            .setDescription(
              "Interval (in ticks), only required for Interval option"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((jump) =>
      jump
        .setName("jump")
        .setDescription("Makes player jump")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "Once", value: "once" },
              { name: "Continuous", value: "continuous" },
              { name: "Interval", value: "interval" }
            )
        )
        .addStringOption((interval) =>
          interval
            .setName("interval")
            .setDescription(
              "Interval (in ticks), only required for Interval option"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((attack) =>
      attack
        .setName("attack")
        .setDescription("Makes player attack")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "Once", value: "once" },
              { name: "Continuous", value: "continuous" },
              { name: "Interval", value: "interval" }
            )
        )
        .addStringOption((interval) =>
          interval
            .setName("interval")
            .setDescription(
              "Interval (in ticks), only required for Interval option"
            )
            .setRequired(false)
        )
    )
    .addSubcommand((turn) =>
      turn
        .setName("turn")
        .setDescription("Turns player")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "Back", value: "back" },
              { name: "Left", value: "left" },
              { name: "Right", value: "right" }
            )
        )
    )
    .addSubcommand((move) =>
      move
        .setName("move")
        .setDescription("Makes player move in specified direction")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "Backward", value: "backward" },
              { name: "Forward", value: "forward" },
              { name: "Left", value: "left" },
              { name: "Right", value: "right" }
            )
        )
    )
    .addSubcommand((look) =>
      look
        .setName("look")
        .setDescription("Makes player look in specified direction")
        .addStringOption((name) =>
          name
            .setName("name")
            .setDescription("Name of player to manage")
            .setRequired(true)
        )
        .addStringOption((args) =>
          args
            .setName("arguments")
            .setDescription("Additional arguments")
            .setRequired(true)
            .addChoices(
              { name: "At", value: "at" },
              { name: "down", value: "down" },
              { name: "east", value: "east" },
              { name: "north", value: "north" },
              { name: "south", value: "south" },
              { name: "up", value: "up" },
              { name: "west", value: "west" }
            )
        )
        .addStringOption((coordinates) =>
          coordinates
            .setName("coordinates")
            .setDescription("coordinates to look at")
            .setRequired(false)
        )
    ),

  async execute(interaction: any) {
    const serverType: string = cmpIp;
    const password: string = cmpPassword;
    const port: number = cmpPort;
    const simpleCommands = new Set<string>([
      "stop",
      "kill",
      "dismount",
      "sneak",
      "unsneak",
      "sprint",
      "unsprint",
    ]);
    const intervalCommands = new Set<string>(["drop", "use", "jump", "attack"]);
    const argumentCommands = new Set<string>(["turn", "move"]);
    const name: string = interaction.options.getString("name");
    let args: string = interaction.options.getString("arguments");
    const interval: string = interaction.options.getString("interval");
    let slot: number = interaction.options.getString("slot");
    const subcommand: string = interaction.options.getSubcommand();
    let skip: boolean = false;
    switch (subcommand) {
      case "swaphands":
        if (args != "interval")
          managePlayer(serverType, port, password, name, "swapHands", args);
        else
          managePlayer(
            serverType,
            port,
            password,
            name,
            "swapHands",
            args + " " + interval
          );
        break;
      case "hotbar":
        if (slot > 9) slot = 9;
        if (slot < 1) slot = 1;
        managePlayer(
          serverType,
          port,
          password,
          name,
          subcommand,
          slot.toString()
        );
        break;
      case "dropstack":
        if (args != "interval")
          managePlayer(serverType, port, password, name, "dropStack", args);
        else
          managePlayer(
            serverType,
            port,
            password,
            name,
            "dropStack",
            args + " " + interval
          );
        break;
      case "mount":
        if (args != "undefined")
          managePlayer(serverType, port, password, name, subcommand, args);
        else managePlayer(serverType, port, password, name, subcommand);
        break;
      case "look":
        const coordinates: string =
          interaction.options.getString("coordinates");
        if (args == "at")
          args = args + " " + (coordinates == undefined ? "" : coordinates);
        managePlayer(serverType, port, password, name, subcommand, args);
        break;
      default: {
        if (simpleCommands.has(subcommand))
          managePlayer(serverType, port, password, name, subcommand);
        else if (argumentCommands.has(subcommand))
          managePlayer(serverType, port, password, name, subcommand, args);
        else if (intervalCommands.has(subcommand)) {
          if (args != "interval")
            managePlayer(serverType, port, password, name, subcommand, args);
          else if (args != "interval" && interval != "undefined")
            managePlayer(
              serverType,
              port,
              password,
              name,
              subcommand,
              args + " " + interval
            );
        } else {
          interaction.reply("Wrong subcommand");
          skip = true;
        }
      }
    }
    if (!skip)
      interaction.reply(
        `${name} ${subcommand} ${args != undefined ? args : ""} ${
          interval != undefined ? interval : ""
        }`
      );
  },
};
