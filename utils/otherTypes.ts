import {
    ChannelType, CommandInteraction, ContextMenuCommandInteraction, LocaleString, LocalizationMap
} from 'discord.js';

import { Settings } from '@prisma/client';

import { Embed } from '../config/config';
import { BotClient } from '../structures/BotClient';

export interface Command {
    name: string,
    description?: string,
    defaultPermissions?: bigint,
    dmPermissions?: bigint,
    mustPermissions?: bigint[],
    allowedPermissions?: bigint[],
    localizations?: commandLocalizations[],
    options?: commandOption[],
    category?: string,
    cooldown?: CommandCooldown,
    mention?: string,
    commandId?: string,
    slashCommandKey?: string,
    execute: (client: BotClient, interaction: CommandInteraction, es: Embed, ls: LocaleString, GuildSettings: Settings) => void;
}
export interface ContextCommand {
    name: string,
    type: "Message"|"User",
    defaultPermissions?: bigint,
    dmPermissions?: bigint,
    mustPermissions?: bigint[],
    allowedPermissions?: bigint[],
    localizations?: LocalizationMap,
    category?: string,
    cooldown?: CommandCooldown,
    mention?: string,
    commandId?: string,
    shortName?: string,
    slashCommandKey?: string,
    execute: (client: BotClient, interaction: ContextMenuCommandInteraction, es: Embed, ls: LocaleString, GuildSettings: Settings) => void;
}
export type CommandCooldown = {
    user: number
    guild: number
}
export type commandLocalizations = {
    name: [LocaleString, string], 
    description: [LocaleString, string]
}
export interface commandOption {
    type: "attachment"|"string"|"number"|"role"|"user"|"channel"|"stringchoices"|"numberchoices",
    name: string,
    description?: string,
    required?: boolean,
    autocomplete?: boolean,
    max?: number,
    min?: number,
    choices?: (commandOptionChoiceString | commandOptionChoiceNumber)[],
    channelTypes?: (ChannelType.GuildText | ChannelType.GuildVoice | ChannelType.GuildCategory | ChannelType.GuildAnnouncement | ChannelType.AnnouncementThread | ChannelType.PublicThread | ChannelType.PrivateThread | ChannelType.GuildStageVoice | ChannelType.GuildForum | ChannelType.GuildMedia)[]
    localizations?: commandOptionLocalizations[]
}
export type commandOptionLocalizations = {
    name: [LocaleString, string], 
    description: [LocaleString, string]
}
export type commandOptionChoiceString = {
    name: string;
    value: string;
}

export type commandOptionChoiceNumber = {
    name: string;
    value: number;
}

export interface dirSetup {
    Folder: string,
    name: string,
    description?: string,
    defaultPermissions?: bigint,
    dmPermissions?: bigint,
    groups?: groupDirSetup[]
    localizations?: groupDirSetupLocalizations[]
}

export type groupDirSetup = {
    Folder: string,
    name: string,
    description?: string,
    localizations?: groupDirSetupLocalizations[]
}

export type groupDirSetupLocalizations = {
    language: LocaleString
    name: string
    description: string
}

export type BotCounters = {
    guilds: number,
    members: number,
    clusterId: number,
    shardIds: number[],
    ping: number,
    uptime: number,
}

export const optionTypes = {
    attachment: "attachment",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            autocomplete: false, //optional,
            type: optionTypes.string,
            max: 1000, //optional,
            min: 1, //optional,
        }
    */
    string: "string",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            autocomplete: false, //optional,
            type: optionTypes.number,
            max: 100, //optional,
            min: 1, //optional,
        }
    */
    number: "number",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            type: optionTypes.role,
        }
    */
    role: "role",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            type: optionTypes.user,
        }
    */
    user: "user",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            channelTypes: [ChannelType.GuildText], //optional,
            type: optionTypes.number,
            max: 100, //optional,
            min: 1, //optional,
        }
    */
    channel: "channel",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            autocomplete: false, //optional,
            type: optionTypes.stringchoices,
            choices: [
                {name: "...", value: "a"},
                {name: "...", value: "b"},
            ]
        }
    */
    stringchoices: "stringchoices",
    /*
        {
            name: "...",
            description: "...",
            required: false, // optional
            autocomplete: false, //optional,
            type: optionTypes.numberchoices,
            choices: [
                {name: "...", value: 1 },
                {name: "...", value: 2 }
            ]
        }
    */
    numberchoices: "numberchoices"
}
export const contextTypes = {
    Message: "Message",
    User: "User"
}