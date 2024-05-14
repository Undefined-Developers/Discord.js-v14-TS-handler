const   
    totalShards = "auto", // Total shards for your bot
    shardsPerCluster = 10, // How much shards you wanna spawn per cluster
    
    bridge_authToken = "auth", // Password for discord-cross-hosting bridge
    bridge_totalMachines = 1, // How much machines you'll use (check discord-cross-hosting docs) 
    bridge_host = "localhost", // ip of hosted bridge (localhost if it's hosted on this machine)
    bridge_port = 4444, // port of bridge
    bridge_use = false, // use bridge, or not? (Use only sharding if not. Won't affect anything cause `discord-cross-hosting` is still in dev.)

    token = "", // Bot token

    logLevel = { // How much data you want to log to console or webhook
        debug: true,            // Send all debug data to console
        info: true,             // Send all info data to console
        error: true,            // Send all error data to console
        success: true,          // Send all success data to console
        warn: true,             // Send all warn data to console
        log: true,              // Send all log data to console

        webhook: {
            link: "",           // Discord webhook for logs in discord (not required, everything below will not work)
            debug: true,        // Send all debug data to webhook
            info: true,         // Send all info data to webhook
            error: true,        // Send all error data to webhook
            success: true,      // Send all success data to webhook
            warn: true,         // Send all warn data to webhook
            log: true,          // Send all log data to webhook
            serverlog: true     // Send guild join log data to webhook
        }
    },
    
    database = "", // postgresql databas econnection link
    
    botName = "erry_handler", // Name of PM2 process
    
    redis = "", // Redis or DFLY connection link
    
    id = "", // Bot ID
    
    devCommands = [ // Array with all commands that should upload ONLY to dev guilds
        "owner"
    ],
    devGuilds = [ // Dev guilds
        "1008300478146293760"
    ],
    ownerIDs = [ // Bot owners (unused in handler source)
        "913117505541775420"
    ],
    
    defaultLanguage = "en-US", // default bot language (https://discord.com/developers/docs/reference#locales)
    
    embed = { // Bot's default embed settings
        color: "#25fa6c", // default color
        wrongcolor: "#e01e01", // default color while error
        warncolor: "#ffa500", // default color while warn
        footertext: "Erry The Best", // default footer text 
        footericon: "" // default image at footer (link to image)
    },
    
    status = { // Bot statuses
        activities: [ // All the activities
            {
                text: "Undefined Dev.", // Text to show
                type: "Listening", // "Listening", "Watching", "Playing"...
            },
            {
                text: "something", // Text to show
                type: "Streaming", // "Listening", "Watching", "Playing"...
                url: "https://twitch.tv/*" // url for "Streaming" status
            }
        ],
        status: "online" // "online", "idle", "dnd", "offline"
    };

const   
    cooldownCategoriesHigh = [""],
    cooldownCommandsHigh = [""],
    defaultCooldownMsHigh = 5000,
    cooldownCategories = [""],
    cooldownCommands = ["test"],
    defaultCooldownMs = 400,
    maximumCoolDownCommands = {
        time: 10000,
        amount: 6,
    }


// HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER -- HANDLER

export const config = {
    "bridge_host": bridge_host,
    "bridge_port": bridge_port,
    "shardsPerCluster": shardsPerCluster,
    "bridge_totalMachines": bridge_totalMachines,
    "totalShards": totalShards,
    "bridge_authToken": bridge_authToken,
    "bridge_use": bridge_use,
    "token": token,
    "logLevel": logLevel,
    "database": database,
    "botName": botName,
    "redis": redis,
    "id": id,
    "devCommands": devCommands,
    "devGuilds": devGuilds,
    "defaultLanguage": defaultLanguage,
    "embed": {
        "color": embed.color,
        "wrongcolor": embed.wrongcolor,
        "warncolor": embed.warncolor,
        "footertext": embed.footertext,
        "footericon": embed.footericon
    },
    "status": {
        "activities": status.activities,
        "status": status.status
    },
    "ownerIDs": ownerIDs
} as Config

export const cooldowns = {
    cooldownCategoriesHigh,
    cooldownCommandsHigh,
    defaultCooldownMsHigh,
    cooldownCategories,
    cooldownCommands,
    defaultCooldownMs,
    maximumCoolDownCommands
} as Cooldowns

interface Cooldowns {
    cooldownCategoriesHigh: string[]
    cooldownCommandsHigh: string[]
    defaultCooldownMsHigh: number
    cooldownCategories: string[]
    cooldownCommands: string[]
    defaultCooldownMs: number
    maximumCoolDownCommands: {
        time: number
        amount: number
    }
}

export interface Config {
    "bridge_authToken": string,
    "totalShards": number | "auto",
    "bridge_totalMachines": number,
    "shardsPerCluster": number,
    "bridge_host": string,
    "bridge_port": number,
    "bridge_use": boolean,
    "token": string,
    "logLevel": LogOptions,
    "database": string,
    "botName": string,
    "redis": string,
    "devCommands": string[],
    "devGuilds": string[],
    "defaultLanguage": LocaleString,
    "embed": Embed
    "status": Status
    "ownerIDs": string[]
}

export interface Embed {
    "guildId"?: string
    "color": ColorResolvable
    "wrongcolor": ColorResolvable
    "warncolor": ColorResolvable
    "footertext": string
    "footericon": string
}

export type Status = {
    activities: StatusActivities[],
    status: PresenceStatusData
}

export type StatusActivities = {
    text: string
    type: "Listening"|"Watching"|"Playing"|"Streaming"|"Custom"|"Competing"
    url?: string
}
export interface LogOptions {
    debug?: boolean,
    info?: boolean,
    error?: boolean,
    success?: boolean,
    warn?: boolean,
    log?: boolean,
    webhook?: webhookOptions
}

export type webhookOptions = {
    link?: string
    debug?: boolean,
    info?: boolean,
    error?: boolean,
    success?: boolean,
    warn?: boolean,
    log?: boolean,
    serverlog?: boolean
}

// NEXT TYPES ARE COPIED FROM DISCORD.JS TYPES TO STOP CONFIG THROWING ERRORS WITHOUT MODULES
type ColorResolvable =
  | keyof typeof Colors
  | 'Random'
  | readonly [red: number, green: number, blue: number]
  | number
  | HexColorString;
declare const Colors: {
    Default: 0x000000;
    White: 0xffffff;
    Aqua: 0x1abc9c;
    Green: 0x57f287;
    Blue: 0x3498db;
    Yellow: 0xfee75c;
    Purple: 0x9b59b6;
    LuminousVividPink: 0xe91e63;
    Fuchsia: 0xeb459e;
    Gold: 0xf1c40f;
    Orange: 0xe67e22;
    Red: 0xed4245;
    Grey: 0x95a5a6;
    Navy: 0x34495e;
    DarkAqua: 0x11806a;
    DarkGreen: 0x1f8b4c;
    DarkBlue: 0x206694;
    DarkPurple: 0x71368a;
    DarkVividPink: 0xad1457;
    DarkGold: 0xc27c0e;
    DarkOrange: 0xa84300;
    DarkRed: 0x992d22;
    DarkGrey: 0x979c9f;
    DarkerGrey: 0x7f8c8d;
    LightGrey: 0xbcc0c0;
    DarkNavy: 0x2c3e50;
    Blurple: 0x5865f2;
    Greyple: 0x99aab5;
    DarkButNotBlack: 0x2c2f33;
    NotQuiteBlack: 0x23272a;
};
type HexColorString = `#${string}`;
declare enum Locale {
    Indonesian = "id",
    EnglishUS = "en-US",
    EnglishGB = "en-GB",
    Bulgarian = "bg",
    ChineseCN = "zh-CN",
    ChineseTW = "zh-TW",
    Croatian = "hr",
    Czech = "cs",
    Danish = "da",
    Dutch = "nl",
    Finnish = "fi",
    French = "fr",
    German = "de",
    Greek = "el",
    Hindi = "hi",
    Hungarian = "hu",
    Italian = "it",
    Japanese = "ja",
    Korean = "ko",
    Lithuanian = "lt",
    Norwegian = "no",
    Polish = "pl",
    PortugueseBR = "pt-BR",
    Romanian = "ro",
    Russian = "ru",
    SpanishES = "es-ES",
    Swedish = "sv-SE",
    Thai = "th",
    Turkish = "tr",
    Ukrainian = "uk",
    Vietnamese = "vi"
}
type LocaleString = `${Locale}`;
type PresenceStatusData = ClientPresenceStatus | 'invisible';
type ClientPresenceStatus = 'online' | 'idle' | 'dnd';