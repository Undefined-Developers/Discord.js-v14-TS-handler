
const force = false

import * as fs from 'fs';
import * as os from 'os';

import { config } from '../config';

var packagejson: any = fs.readFileSync('./package.json')
packagejson = JSON.parse(packagejson)
getOperatingSystemCommands()
packagejson = JSON.stringify(packagejson, null, 2);
fs.writeFileSync('./package.json', packagejson);
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
    packagejson.scripts.start = `FORCE_COLOR=1 pm2 start --name 'bridge_${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.restart = `pm2 restart 'bridge_${config.botName}' && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.stop = `pm2 stop 'bridge_${config.botName}'`
    packagejson.scripts.delete = `pm2 delete 'bridge_${config.botName}' && pm2 save`
}
function loadWindowsCommands(): void {
    packagejson.scripts.start = `set FORCE_COLOR=1 && pm2 start --name 'bridge_${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.restart = `pm2 restart 'bridge_${config.botName}' && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.stop = `pm2 stop 'bridge_${config.botName}'`
    packagejson.scripts.delete = `pm2 delete 'bridge_${config.botName}' && pm2 save`
}
function loadUnknownCommands(): void {
    packagejson.scripts.start = `pm2 start --name 'bridge_${config.botName}' npx -- tsx index.ts && pm2 save && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.restart = `pm2 restart 'bridge_${config.botName}' && pm2 log 'bridge_${config.botName}'`
    packagejson.scripts.stop = `pm2 stop 'bridge_${config.botName}'`
    packagejson.scripts.delete = `pm2 delete 'bridge_${config.botName}' && pm2 save`
}