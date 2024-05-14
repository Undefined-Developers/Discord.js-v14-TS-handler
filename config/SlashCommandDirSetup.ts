import { dirSetup as dirSetupType } from '../utils/otherTypes';

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
] as dirSetupType[]