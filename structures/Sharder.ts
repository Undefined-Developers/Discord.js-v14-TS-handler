import { Bridge, Client } from 'discord-cross-hosting';
import {
    ClusterManager, evalOptions, HeartbeatManager, ReClusterManager
} from 'discord-hybrid-sharding';
import { ShardClientUtil } from 'discord.js';
import { exec as ChildProcessExec } from 'node:child_process';

import { config } from '../config/config.ts';
import { isValidSnowflake } from './Functions.ts';
import { Logger } from './Logger.ts';

const botPath = `${process.cwd()}/bot.ts`;

const LOGGER = new Logger({ prefix: " ClusterMngr ", ...config.logLevel });

export class ErryClusterManager extends ClusterManager {
    public checkShardDowntime: NodeJS.Timeout | null;
    public bridgeServer: Bridge | null;
    public bridgeClient: Client | null;
    public logger: Logger;
    constructor() {
        super(botPath, {
            totalShards: 1,
            shardsPerClusters: config.bridge_shardsPerCluster === "auto" ? undefined : Number(config.bridge_shardsPerCluster),
            shardArgs: [ ],
            execArgv: Array.from(process.execArgv),
            mode: 'process',
            token: config.token,
        });
        this.checkShardDowntime = null
        this.bridgeServer = null
        this.bridgeClient = null
        this.logger = LOGGER;
        this.extend(new ReClusterManager());
        this.extend(new HeartbeatManager({ interval: 15e3, maxMissedHeartbeats: 5 }));
        this.on("debug", (m) => this.logger.debug(`[MANAGER] ${m}`));
        this.init();
    }

    clusterIdOfShardId(shardId: number | string) {
        if(typeof shardId === "undefined" || typeof shardId !== "number" || isNaN(shardId)) throw new Error("No valid ShardId Provided")
        if(Number(shardId) > this.totalShards) throw new Error("Provided ShardId, is bigger than all Shard Ids");
        const middlePart = Number(shardId) === 0 ? 0 : Number(shardId) / Math.ceil(this.totalShards / this.totalClusters);
        return Number(shardId) === 0 ? 0 : (Math.ceil(middlePart) - (middlePart % 1 !== 0 ? 1 : 0));
    }
    clusterIdOfGuildId(guildId: string) {
        if(!guildId || !isValidSnowflake(guildId)) throw new Error("Provided GuildId, is not a valid GuildId");
        return this.clusterIdOfShardId(this.shardIdOfGuildId(guildId));
    }
    shardIdOfGuildId(guildId: string) {
        if(!guildId || !isValidSnowflake(guildId)) throw new Error("Provided GuildId, is not a valid GuildId");
        return ShardClientUtil.shardIdForGuildId(guildId, this.totalShards);
    }
    async evalOnGuild(callBackFunction: Function, guildID: string, options:Partial<evalOptions>={}) {
        if(!guildID || !isValidSnowflake(guildID)) throw new Error("Provided GuildId, is not a valid GuildId");
        if(typeof options !== "object") throw new Error("Provided Options, must be an object!");

        options.cluster = this.clusterIdOfGuildId(guildID);

        // @ts-ignore
        return this.broadcastEval(callBackFunction, options).then(v => v[0]);
    }
    overWriteHooks() {
        this.hooks.constructClusterArgs = (cluster, args) => {
            return [
                ...args,
                `| Cluster: #${cluster.id}, Shard${cluster.shardList.length !== 1 ? "s" : ""}: ${cluster.shardList.map(sId => `#${sId}`).join(", ")}`
            ];
        }
    }

    async initBridgeServer() {
        if (!config.bridge_create) return true;
        this.bridgeServer = new Bridge({
            listenOptions: {
                host: "0.0.0.0"
            },
            port: config.bridge_port,
            authToken: config.bridge_authToken,
            totalShards: config.bridge_totalShards === "auto" ? "auto" : Number(config.bridge_totalShards),
            totalMachines: config.bridge_machines,
            shardsPerCluster: config.bridge_shardsPerCluster === "auto" ? undefined : Number(config.bridge_shardsPerCluster),
            token: config.token
        });
        this.bridgeServer.on("debug", (d) => this.logger.debug("[BRIDGE]", d));
        return this.bridgeServer.start();
    }

    async initBridgeClient() {
        this.bridgeClient = new Client({
            agent: "bot",
            host: config.bridge_create ? "127.0.0.1" : config.bridge_host,
            port: config.bridge_port,
            authToken: config.bridge_authToken,
            retries: 360,
            rollingRestarts: false
        });
        // @ts-ignore
        this.bridgeClient.on("debug", (d) => this.logger.debug("[CLIENT]", d));
        this.bridgeClient.on("status", (status) => this.logger.debug(`[CLIENT] Status : ${status}`));
        this.bridgeClient.on("close", (reason) => this.logger.info("[CLIENT] Closed: ", String(reason)));
        this.bridgeClient.on("error", (error) => {this.logger.stringError("[CLIENT] Error: "); this.logger.stringError(String(error))});
        // @ts-ignore
        this.bridgeClient.listen(this);
        return this.bridgeClient.connect();
    }

    async init() {
        await this.initBridgeServer();
        await this.initBridgeClient();
        this.overWriteHooks()
        this.listenStopManager();
        this.listenSpawningEvents();
        await this.summon();
    }

    listenStopManager() {
        // terminate the program if needed
        ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'].forEach(signal => 
            process.on(signal, () => {
                this.logger.info("Terminating main process...");
                process.exit()
            })
        );
        // terminate the childs if needed
        ["beforeExit", "exit"].forEach(event => 
            process.on(event, () => {
                this.logger.info("Terminating all the shard processes...");
                ChildProcessExec(`pkill -f "${botPath}" -SIGKILL`)
            })
        );
        return true;
    }
    listenSpawningEvents() {
        const startTime = process.hrtime();
        return this.on('clusterCreate', cluster => {
            this.logger.info(`Launched Cluster #${cluster.id}  (${cluster.id+1}/${this.totalClusters} Clusters) [${this.clusters.get(cluster.id)?.shardList.length}/${this.totalShards} Shards]`)
            cluster.on("message", async (msg) => {
                // here you can handle custom ipc messages if you want... you can think of a style of that...
            });
            // when all clusters are ready...
            const clusterAmount = Math.ceil(Number(this.totalShards) / Number(this.shardsPerClusters));
            if(Array.from(this.clusters.values()).filter(c => c.ready).length === clusterAmount) readyManagerEvent(this, startTime);
        });
    }
    async summon(timeout?:number, delay?:number) {
        await this.bridgeClient?.requestShardData()
            .then(e => {
                if (!e) return;
                if (!e.shardList) return;
                this.totalShards = e.totalShards;
                this.totalClusters = e.shardList.length;
                this.shardList = e.shardList[0];
                this.clusterList = e.clusterList;
            })
        return await this.spawn({ timeout: timeout ?? -1, delay: delay ?? 7000 })
    }
}

const readyManagerEvent = async (manager:ErryClusterManager, startTime:[number, number]) => {
    LOGGER.info(`All Clusters fully started\nTook ${calcProcessDurationTime(startTime)}ms`);

    if(manager.checkShardDowntime) clearInterval(manager.checkShardDowntime);

    manager.checkShardDowntime = setInterval(async () => {
        const res = await manager.broadcastEval(`this.ws.status ? this.ws.reconnect() : 0`).catch(e => {
            LOGGER.error(e)
            LOGGER.stringError(`Script: "this.ws.status ? this.ws.reconnect() : 0"`)
            return []
        });

        if(res.filter(Boolean).length) LOGGER.debug("[MANAGER_CHECKER] Restarted shards:", String(res));
        return;
    }, 180000).unref();
};

export function calcProcessDurationTime(beforeHRTime:[number, number]): number {
    const timeAfter = process.hrtime(beforeHRTime);
    return Math.floor((timeAfter[0] * 1000000000 + timeAfter[1]) / 10000) / 100;
}