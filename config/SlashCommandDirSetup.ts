import { dirSetup as dirSetupType } from '../utils/otherTypes';

export const dirSetup = [
    {
        Folder: "Info", // == FolderName
        name: "info", // == CommandName 

        // defaultPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,
        // dmPermissions: new PermissionsBitField([PermissionFlagsBits.Administrator]).bitfield,

        /* localizations: [
            {
                name: ["en-US", "info"]
                description: ["en-US", "Get Information about Server/User/Bot/..."]
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
] as dirSetupType[]