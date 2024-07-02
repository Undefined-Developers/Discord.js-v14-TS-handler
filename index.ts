import { Bridge } from 'discord-cross-hosting';

import { config } from './config';

const server = new Bridge({
    port: config.port, // The Port of the Server | Proxy Connection (Replit) needs Port 443
    authToken: config.authToken,
    totalShards: config.totalShards, // The Total Shards of the Bot or 'auto'
    totalMachines: config.totalMachines, // The Total Machines, where the Clusters will run
    shardsPerCluster: config.shardsPerCluster, // The amount of Internal Shards, which are in one Cluster
    token: config.token,
});

server.on('debug', console.log);
server.start();
server.on('ready', url => {
    console.log('Server is ready' + url);
});