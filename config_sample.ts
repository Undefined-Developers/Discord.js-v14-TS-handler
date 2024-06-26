const   
    totalShards = "auto", // Total shards for your bot
    shardsPerCluster = 10, // How much shards you wanna spawn per cluster
    
    authToken = "auth", // Password for discord-cross-hosting bridge
    totalMachines = 1, // How much machines you'll use (check discord-cross-hosting docs) 
    port = 4444, // port of bridge

    token = "", // Bot token

    botName = "erry_handler" // Name of PM2 process


// HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER

export const config = {
    "port": port,
    "shardsPerCluster": shardsPerCluster,
    "totalMachines": totalMachines,
    "totalShards": totalShards,
    "authToken": authToken,
    "token": token,
    "botName": botName
} as Config

export interface Config {
    "authToken": string,
    "totalShards": number | "auto",
    "totalMachines": number,
    "shardsPerCluster": number,
    "port": number,
    "token": string,
    "botName": string,
}