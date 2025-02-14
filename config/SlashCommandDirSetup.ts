import { PermissionFlagsBits, PermissionsBitField } from 'discord.js';

import { dirSetup as dirSetupType, contexts } from '../utils/otherTypes';

export const dirSetup = [
    {
        Folder: "Info", // Folder Name
        name: "info", // Command Name (you'll see in discord)

        // defaultPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        // dmPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,

        /* localizations: [
            {
                language: "en-US"
                name: "info"
                description: "Get Information about Server/User/Bot/..."
            }
        ]*/
        
        description: "Get Information about Server/User/Bot/...",
        groups: [
            {
                Folder: "Server",
                name: "server",
                description: "Server specific Informations",
            },
            {
                Folder: "Bot",
                name: "bot",
                description: "Bot specific Informations",
            }
        ]
    },
    {
        Folder: "Owner",
        name: "owner",

        contexts: [
            contexts.guild,
            //contexts.dm,       // Make group available withing DMs with bot
            //contexts.groupDm   // Make group available withing group DMs with bot
        ],

        defaultPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        
        description: "DON't TOUCH THIS COMMANDS! pls",
        groups: [
            {
                Folder: "Blacklist",
                name: "blacklist",
                description: "Blacklist commands",
            }
        ]
    },
] as dirSetupType[]