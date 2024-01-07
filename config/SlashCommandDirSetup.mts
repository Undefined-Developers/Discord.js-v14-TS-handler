import { PermissionFlagsBits, PermissionsBitField } from 'discord.js';

import { dirSetup as dirSetupType } from '../utils/otherTypes.mts';

export const dirSetup = [
    {
        Folder: "Info", // == FolderName
        name: "info", // == CommandName 

        // defaultPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        // dmPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        
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
        Folder: "Setup",
        name: "setup",

        defaultPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        
        description: "Bot setup commands",
        groups: [
            {
                Folder: "AIchat",
                name: "aichat",
                description: "AIchat setup commands",
            },
            {
                Folder: "Music",
                name: "music",
                description: "Music setup commands",
            },
            {
                Folder: "Jtc",
                name: "jtc",
                description: "JTC setup commands",
            }
        ]
    },
    {
        Folder: "Owner",
        name: "owner",

        defaultPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        
        description: "DON't TOUCH THIS COMMANDS!",
        groups: [
            {
                Folder: "Blacklist",
                name: "blacklist",
                description: "Serverspecific Informations",
            },
            {
                Folder: "Reload",
                name: "reload",
                description: "Bot specific Informations",
            }
        ]
    },
    {
        Folder: "Queue", 
        name: "queue", 
        
        description: "Music queue controls!",
        groups: [
            {
                Folder: "Loop",
                name: "loop",
                description: "Player loops",
            }
        ]
    },
    {
        Folder: "Player", 
        name: "player",
        
        description: "Music player controls!",
    },
    {
        Folder: "Voice", 
        name: "voice", 
        
        description: "Jtc channel controls!",
        groups: [
            {
                Folder: "User",
                name: "user",
                description: "Control users",
            }
        ]
    },
] as dirSetupType[]