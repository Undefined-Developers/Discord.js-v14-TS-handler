
const force = false

import("dotenv").then(dotenv => dotenv.config());
import { parse, stringify } from 'envfile';
import * as fs from 'fs';
import * as os from 'os';

import { config } from '../config/config';

var envfile: any
try {
    envfile = fs.readFileSync('.env')
}catch(e){}
if (envfile) envfile = parse(envfile)
else envfile = {}
envfile.DATABASE_URL = config.database
envfile.BOT_PROCESS_NAME = config.botName
var packagejson: any = fs.readFileSync('./package.json')
packagejson = JSON.parse(packagejson)
getOperatingSystemCommands()
packagejson = JSON.stringify(packagejson, null, 2);
fs.writeFileSync('./package.json', packagejson);
fs.writeFileSync('.env' ,stringify(envfile) ,{encoding:'utf8', flag:'w'})
process.exit()

function getOperatingSystemCommands(): void {
    const platform: string = os.platform();

    if (platform.startsWith('win')) {
        return loadWindowsCommands();
    } else if (platform.startsWith('linux')) {
        return loadLinuxCommands();
    } else {
        if (!force) {
            console.error("[INIT SETUP] Code can't determine your OS. I'm not sure you can run it! If you are, go to file \"TS_Handler/utils/init.ts\" and set variable \"force\" to true")
            process.exit(1)
        }
        return loadUnknownCommands();
    }
}
function loadLinuxCommands(): void {
    packagejson.scripts.start = `FORCE_COLOR=1 pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log '${config.botName}'`
    packagejson.scripts.restart = `pm2 restart '${config.botName}' && pm2 log '${config.botName}'`
    packagejson.scripts.stop = `pm2 stop '${config.botName}'`
    packagejson.scripts.delete = `pm2 delete '${config.botName}' && pm2 save --force`
    packagejson.scripts.bridge_start = `FORCE_COLOR=1 pm2 start --name 'bridge_${config.botName}' npx -- tsx bridge/index.ts && pm2 save && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.bridge_restart = `pm2 restart 'bridge_${config.botName}' && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.bridge_stop = `pm2 stop 'bridge_${config.botName}'`
    packagejson.scripts.bridge_delete = `pm2 delete 'bridge_${config.botName}' && pm2 save`
    packagejson.scripts.stop_all = `pm2 stop 'bridge_${config.botName}' '${config.botName}' && pm2 save`
    packagejson.scripts.delete_all = `pm2 delete 'bridge_${config.botName}' '${config.botName}' && pm2 save`
    packagejson.scripts.start_all = `FORCE_COLOR=1 pm2 start --name 'bridge_${config.botName}' npx -- tsx bridge/index.ts && FORCE_COLOR=1 pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save --force && pm2 log '${config.botName}'`
}
function loadWindowsCommands(): void {
    packagejson.scripts.start = `set FORCE_COLOR=1 && pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log '${config.botName}'`
    packagejson.scripts.restart = `pm2 restart '${config.botName}' && pm2 log '${config.botName}'`
    packagejson.scripts.stop = `pm2 stop '${config.botName}'`
    packagejson.scripts.delete = `pm2 delete '${config.botName}' && pm2 save --force`
    packagejson.scripts.bridge_start = `set FORCE_COLOR=1 && pm2 start --name 'bridge_${config.botName}' npx -- tsx bridge/index.ts && pm2 save && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.bridge_restart = `pm2 restart 'bridge_${config.botName}' && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.bridge_stop = `pm2 stop 'bridge_${config.botName}'`
    packagejson.scripts.bridge_delete = `pm2 delete 'bridge_${config.botName}' && pm2 save`
    packagejson.scripts.stop_all = `pm2 stop 'bridge_${config.botName}' '${config.botName}' && pm2 save`
    packagejson.scripts.delete_all = `pm2 delete 'bridge_${config.botName}' '${config.botName}' && pm2 save`
    packagejson.scripts.start_all = `set FORCE_COLOR=1 && pm2 start --name 'bridge_${config.botName}' npx -- tsx bridge/index.ts && set FORCE_COLOR=1 && pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save --force && pm2 log '${config.botName}'`
}
function loadUnknownCommands(): void {
    packagejson.scripts.start = `pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log '${config.botName}'`
    packagejson.scripts.restart = `pm2 restart '${config.botName}' && pm2 log '${config.botName}'`
    packagejson.scripts.stop = `pm2 stop '${config.botName}'`
    packagejson.scripts.delete = `pm2 delete '${config.botName}' && pm2 save --force`
    packagejson.scripts.bridge_start = `pm2 start --name 'bridge_${config.botName}' npx -- tsx bridge/index.ts && pm2 save && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.bridge_restart = `pm2 restart 'bridge_${config.botName}' && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.bridge_stop = `pm2 stop 'bridge_${config.botName}'`
    packagejson.scripts.bridge_delete = `pm2 delete 'bridge_${config.botName}' && pm2 save`
    packagejson.scripts.stop_all = `pm2 stop 'bridge_${config.botName}' '${config.botName}' && pm2 save`
    packagejson.scripts.delete_all = `pm2 delete 'bridge_${config.botName}' '${config.botName}' && pm2 save`
    packagejson.scripts.start_all = `pm2 start --name 'bridge_${config.botName}' npx -- tsx bridge/index.ts && pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save --force && pm2 log '${config.botName}'`
}