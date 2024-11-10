import { parse, stringify } from 'envfile';
import * as fs from 'fs';
import * as os from 'os';

import { config } from '../config/config';

let packagejson: any = fs.readFileSync('./package.json')
let envfile: any
let connectionString
let force: boolean
export function INIT(frc: boolean) {
    force = frc
    try {
        envfile = fs.readFileSync('.env')
    }catch(e){}
    if (envfile) envfile = parse(envfile)
    else envfile = {}
    try {
        connectionString = new URL(config.database || envfile.DATABASE_URL)
    }catch(e){
        console.error("Please check if you provided database link in any config or env")
        process.exit(1)
    }
    envfile.DATABASE_URL = envfile.DATABASE_URL === connectionString.toString() || config.database === "" ? envfile.DATABASE_URL : connectionString.toString(); //connectionString.toString()
    envfile.BOT_PROCESS_NAME = config.botName
    envfile.TOKEN = envfile.TOKEN === config.token || config.token === "" ? envfile.TOKEN : config.token;
    envfile.AUTH_KEY = envfile.AUTH_KEY === config.bridge_authToken || config.bridge_authToken === "" ? envfile.AUTH_KEY : config.bridge_authToken;
    envfile.REDIS = envfile.REDIS === config.redis || config.redis === "" ? envfile.REDIS : config.redis;
    envfile.BRIDGE_HOST = envfile.BRIDGE_HOST === config.bridge_host || config.bridge_host === "" ? envfile.BRIDGE_HOST : config.bridge_host;
    envfile.BRIDGE_PORT = envfile.BRIDGE_PORT === config.bridge_port || (!config.bridge_port || config.bridge_port === 0) ? envfile.BRIDGE_PORT : config.bridge_port;
    packagejson = JSON.parse(packagejson)
    getOperatingSystemCommands()
    packagejson = JSON.stringify(packagejson, null, 2);
    fs.writeFileSync('./package.json', packagejson);
    fs.writeFileSync('.env' ,stringify(envfile) ,{encoding:'utf8', flag:'w'})
    process.exit()
}

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
    packagejson.scripts["start:cmd"] = `FORCE_COLOR=1 npx tsx index.js`
    packagejson.scripts.restart = `pm2 restart '${config.botName}' && pm2 log '${config.botName}'`
    packagejson.scripts.stop = `pm2 stop '${config.botName}'`
    packagejson.scripts.delete = `pm2 delete '${config.botName}' && pm2 save --force`
}
function loadWindowsCommands(): void {
    packagejson.scripts.start = `set FORCE_COLOR=1 && pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log '${config.botName}'`
    packagejson.scripts["start:cmd"] = `set FORCE_COLOR=1 && npx tsx index.js`
    packagejson.scripts.restart = `pm2 restart '${config.botName}' && pm2 log '${config.botName}'`
    packagejson.scripts.stop = `pm2 stop '${config.botName}'`
    packagejson.scripts.delete = `pm2 delete '${config.botName}' && pm2 save --force`
}
function loadUnknownCommands(): void {
    packagejson.scripts.start = `pm2 start --name '${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log '${config.botName}'`
    packagejson.scripts["start:cmd"] = `npx tsx index.js`
    packagejson.scripts.restart = `pm2 restart '${config.botName}' && pm2 log '${config.botName}'`
    packagejson.scripts.stop = `pm2 stop '${config.botName}'`
    packagejson.scripts.delete = `pm2 delete '${config.botName}' && pm2 save --force`
}