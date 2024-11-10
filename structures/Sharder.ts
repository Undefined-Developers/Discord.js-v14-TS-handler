import { Client, Bridge} from "discord-cross-hosting";
import {
    ClusterManager, evalOptions, HeartbeatManager, ReClusterManager
} from "discord-hybrid-sharding";
import { ShardClientUtil } from "discord.js";
import { exec as ChildProcessExec } from "node:child_process";
import {config} from "../config/config.ts";
import {isValidSnowflake} from "./Functions.ts";

const botPath = `${process.cwd()}/bot.ts`;

export class ErryClusterManager extends ClusterManager {
    public checkShardDowntime: NodeJS.Timeout | null;
    public bridgeServer: Bridge | null;
    public bridgeClient: Client | null;
    constructor() {
        super(botPath, {
            totalShards: config.bridge_totalShards === "auto" ? "auto" : Number(config.bridge_totalShards),
            shardsPerClusters: config.bridge_shardsPerCluster === "auto" ? undefined : Number(config.bridge_shardsPerCluster),
            shardArgs: [ ],
            execArgv: Array.from(process.execArgv),
            mode: 'process',
            token: process.env.TOKEN || config.token,
        });
        this.checkShardDowntime = null
        this.bridgeServer = null
        this.bridgeClient = null
        this.on("debug", console.debug);
        this.extend(new ReClusterManager());
        this.extend(new HeartbeatManager({ interval: 15e3, maxMissedHeartbeats: 5 }));

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

    // first init the bridge server
    async initBridgeServer() {
        if (!config.bridge_create) return true;
        this.bridgeServer = new Bridge({
            listenOptions: {
                host: "0.0.0.0"
            },
            port: Number(process.env.BRIDGE_PORT) || config.bridge_port,
            authToken: process.env.AUTH || config.bridge_authToken,
            totalShards: config.bridge_totalShards,
            totalMachines: config.bridge_machines,
            //@ts-ignore
            shardsPerCluster: config.bridge_shardsPerCluster,
            token: process.env.TOKEN || config.token
        });
        this.bridgeServer.on("debug", (d) => console.log("BRIDGE SERVER [DEBUG]", d, "\n\n\n"));
        return this.bridgeServer.start();
    }

    async initBridgeClient() {
        this.bridgeClient = new Client({
            agent: "bot",
            host: config.bridge_create ? "127.0.0.1" : (process.env.BRIDGE_HOST || config.bridge_host),
            port: Number(process.env.BRIDGE_PORT) || config.bridge_port,
            authToken: process.env.AUTH || config.bridge_authToken,
            retries: 360,
            rollingRestarts: false
        });
        // @ts-ignore
        this.bridgeClient.on("debug", (d) => console.log("BRIDGE-CLIENT [DEBUG]", d, "\n\n\n"));
        this.bridgeClient.on("status", (status) => console.log(`BRIDGE-CLIENT [STATUS] : ${status}`, "\n"));
        this.bridgeClient.on("close", (reason) => console.log("BRIDGE-CLIENT [CLOSED]", reason, "\n\n\n\n\n"));
        this.bridgeClient.on("error", (error) => console.log("BRIDGE-CLIENT [ERRORED]", error, "\n\n\n\n\n"));
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
    // force-terminate all childs if master get's terminated (only works on linux based distros)
    listenStopManager() {
        // terminate the program if needed
        ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'].forEach(signal => process.on(signal, () => {console.log("Exiting...");process.exit()}));
        // terminate the childs if needed
        ["beforeExit", "exit"].forEach(event => process.on(event, () => {console.log("Exiting...");ChildProcessExec(`pkill -f "${botPath}" -SIGKILL`)}));
        return true;
    }
    listenSpawningEvents() {
        const startTime = process.hrtime();
        return this.on('clusterCreate', cluster => {
            console.log(`Launched Cluster #${cluster.id}  (${cluster.id+1}/${this.totalClusters} Clusters) [${this.clusters.get(cluster.id)?.shardList.length}/${this.totalShards} Shards]`)
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
    console.log(`All Clusters fully started\nTook ${calcProcessDurationTime(startTime)}ms`);

    if(manager.checkShardDowntime) clearInterval(manager.checkShardDowntime);

    manager.checkShardDowntime = setInterval(async () => {
        const res = await manager.broadcastEval(`this.ws.status ? this.ws.reconnect() : 0`).catch(e => {
            console.error(e, `Script: "this.ws.status ? this.ws.reconnect() : 0"`)
            return []
        });

        if(res.filter(Boolean).length) console.log("MANAGER_CHECKER", "Restarted shards", res);
        return;
    }, 180000).unref();
};

// process.hrtime() based formatter function:
export function calcProcessDurationTime(beforeHRTime:[number, number]): number {
    const timeAfter = process.hrtime(beforeHRTime);
    return Math.floor((timeAfter[0] * 1000000000 + timeAfter[1]) / 10000) / 100;
}