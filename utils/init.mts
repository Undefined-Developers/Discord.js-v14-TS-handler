import("dotenv").then(dotenv => dotenv.config());
import { parse, stringify } from 'envfile';
import * as fs from 'fs';

import { getConfig } from '../config/config.mts';

var envfile: any
try {
    envfile = fs.readFileSync('.env')
}catch(e){}
if (envfile) envfile = parse(envfile)
else envfile = {}
envfile.DATABASE_URL = getConfig().database
envfile.BOT_PROCESS_NAME = getConfig().botName
var packagejson: any = fs.readFileSync('./package.json')
packagejson = JSON.parse(packagejson)
packagejson.scripts.start = `FORCE_COLOR=1 pm2 start --name '${getConfig().botName}' npx -- tsx index.mts && pm2 save && pm2 log '${getConfig().botName}'`
packagejson.scripts.restart = `pm2 restart '${getConfig().botName}' && pm2 log '${getConfig().botName}'`
packagejson.scripts.stop = `pm2 stop '${getConfig().botName}'`
packagejson.scripts.delete = `pm2 delete '${getConfig().botName}' && pm2 save --force`
packagejson.scripts.bridge_start = `FORCE_COLOR=1 pm2 start --name 'bridge_${getConfig().botName}' npx -- tsx bridge/index.mts && pm2 save && pm2 log 'bridge_${getConfig().botName}'`
packagejson.scripts.bridge_restart = `pm2 restart 'bridge_${getConfig().botName}' && pm2 log 'bridge_${getConfig().botName}'`
packagejson.scripts.bridge_stop = `pm2 stop 'bridge_${getConfig().botName}'`
packagejson.scripts.bridge_delete = `pm2 delete 'bridge_${getConfig().botName}' && pm2 save --force`
packagejson.scripts.delete_all = `pm2 delete 'bridge_${getConfig().botName}' '${getConfig().botName}' && pm2 save --force`
packagejson.scripts.start_all = `FORCE_COLOR=1 pm2 start --name 'bridge_${getConfig().botName}' npx -- tsx bridge/index.mts && FORCE_COLOR=1 pm2 start --name '${getConfig().botName}' npx -- tsx index.mts && pm2 save --force && pm2 log '${getConfig().botName}'`
packagejson = JSON.stringify(packagejson, null, 2);
fs.writeFileSync('./package.json', packagejson);
fs.writeFileSync('.env' ,stringify(envfile) ,{encoding:'utf8', flag:'w'})
process.exit()