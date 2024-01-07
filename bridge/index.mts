import { Bridge } from 'discord-cross-hosting';

import { getConfig } from '../config/config.mts';

const server = new Bridge({
    port: getConfig().bridge_port, // The Port of the Server | Proxy Connection (Replit) needs Port 443
    authToken: getConfig().bridge_authToken,
    totalShards: getConfig().bridge_totalShards, // The Total Shards of the Bot or 'auto'
    totalMachines: getConfig().bridge_totalMachines, // The Total Machines, where the Clusters will run
    shardsPerCluster: getConfig().bridge_shardsPerCluster, // The amount of Internal Shards, which are in one Cluster
    token: getConfig().token,
});

server.on('debug', console.log);
server.start();
server.on('ready', url => {
    console.log('Server is ready' + url);
    setInterval(() => {
        server.broadcastEval('this.guilds.cache.size').then(console.log).catch(console.log);
    }, 10000);
});