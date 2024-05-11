import { Client } from 'discord-cross-hosting';
import { ClusterManager, HeartbeatManager, ReClusterManager } from 'discord-hybrid-sharding';

import { config } from '../config/config';

export function startSharderManager() {
  if (!config.bridge_use) return start();
  return startBridged();
}

const botPath = `${process.cwd()}/bot.ts`;

function startBridged() {

  const client = new Client({
    agent: 'bot',
    host: config.bridge_host,
    port: config.bridge_port,
    authToken: config.bridge_authToken,
    rollingRestarts: true,
  });
  //@ts-ignore
  client.on('debug', console.log);
  client.connect();

  const manager = new ClusterManager(botPath, {
      totalShards: 1,
      shardsPerClusters: 1,
      mode: "worker",
      token: config.token,
      execArgv: [ ...process.execArgv ],
  });

  manager.extend(
      new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
      })
  );
  manager.extend(
      new ReClusterManager({
          restartMode: "rolling",
      })
  );

  manager.hooks = {
    ...manager.hooks,
    constructClusterArgs: (cluster, args) => {
      return [
        ...args,
        `Erry Cluster: #${cluster.id}, Shard${cluster.shardList.length !== 1 ? "s" : ""}: ${cluster.shardList}`
      ]
    }
  }

  client.listen(manager);

  client
    .requestShardData()
    .then(e => {
        if (!e) return;
        if (!e.shardList) return;
        manager.totalShards = e.totalShards;
        manager.totalClusters = e.shardList.length;
        manager.shardList = e.shardList[0];
        manager.clusterList = e.clusterList;
        console.log(e.shardList)
        manager.spawn({ timeout: -1 });
    })
    .catch(e => console.log(e));

  setInterval(async () => {
      for(let cluster = 0; cluster < manager.totalClusters, cluster++;) {
        await manager.broadcastEval((c) => true, { cluster, timeout: 10000 }).catch((error) => {
          manager.clusters.get(cluster)?.respawn();
        });
      }
  }, 60000)
}

function start() {
  const manager = new ClusterManager(botPath, {
    totalShards: config.totalShards,
    shardsPerClusters: config.shardsPerCluster,
    mode: "process",
    token: config.token,
    execArgv: [ ...process.execArgv ]
  });

  manager.extend(
    new HeartbeatManager({
      interval: 2000,
      maxMissedHeartbeats: 5,
    })
  );
  manager.extend(
      new ReClusterManager({
          restartMode: "rolling",
      })
  );

  manager.hooks = {
    ...manager.hooks,
    constructClusterArgs: (cluster, args) => {
      return [
        ...args,
        `Erry Cluster: #${cluster.id}, Shard${cluster.shardList.length !== 1 ? "s" : ""}: ${cluster.shardList}`
      ]
    }
  }

  manager.spawn({ timeout: -1 });
}