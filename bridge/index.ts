import { Bridge } from 'discord-cross-hosting';

import { config } from '../config/config';

const server = new Bridge({
    port: config.bridge_port, // The Port of the Server | Proxy Connection (Replit) needs Port 443
    authToken: config.bridge_authToken,
    totalShards: config.totalShards, // The Total Shards of the Bot or 'auto'
    totalMachines: config.bridge_totalMachines, // The Total Machines, where the Clusters will run
    shardsPerCluster: config.shardsPerCluster, // The amount of Internal Shards, which are in one Cluster
    token: config.token,
});

server.on('debug', console.log);
server.start();
server.on('ready', url => {
    console.log('Server is ready' + url);
    setInterval(() => {
        server.broadcastEval('this.guilds.cache.size').then(console.log).catch(console.log);
    }, 10000);
});