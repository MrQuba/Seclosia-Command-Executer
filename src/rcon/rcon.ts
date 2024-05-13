import { RCON } from 'minecraft-server-util'
// source https://github.com/defnot001/KiwiTech-Bot/blob/main/src/util/rcon.ts
export const runRconCommand = async (
  host: string,
  rconPort: number,
  rconPassword: string,
  command: string
) => {
  const rconClient: RCON = new RCON()

  await rconClient.connect(host, rconPort)
  await rconClient.login(rconPassword)

  const data = await rconClient.execute(command)
  await rconClient.close()
  console.log(data)
  return data
}
export const managePlayer = async (
  host: string,
  rconPort: number,
  rconPasswd: string,
  name: string,
  action: string,
  other?: string
) => {
  let command: string
  if (other == undefined) command = 'player ' + name + ' ' + action
  else command = 'player ' + name + ' ' + action + ' ' + other
  const response = await runRconCommand(host, rconPort, rconPasswd, command)

  return response
}
export const getList = async (
  host: string,
  rconPort: number,
  rconPasswd: string
) => {
  const response = await runRconCommand(host, rconPort, rconPasswd, 'list')

  return response
    .split(', ')
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
}
export const changePermissionForPlayer = async (
  host: string,
  rconPort: number,
  rconPasswd: string,
  name: string,
  grant: boolean
) => {
  const command: string = grant ? 'op ' + name : 'deop ' + name
  const response = await runRconCommand(host, rconPort, rconPasswd, command)
  return response
}
export const modifyWhitelist = async (
  host: string,
  rconPort: number,
  rconPasswd: string,
  name: string,
  add: boolean
) => {
  let command: string = 'whitelist '
  command += add ? 'add ' + name : 'remove ' + name
  const response = await runRconCommand(host, rconPort, rconPasswd, command)
  return response
}
export const getWhitelist = async (
  host: string,
  rconPort: number,
  rconPasswd: string
) => {
  const response = await runRconCommand(
    host,
    rconPort,
    rconPasswd,
    'whitelist list'
  )
  return response
}
