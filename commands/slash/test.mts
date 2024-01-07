import { ErrySuccessEmbed } from '../../structures/Functions.mts';
import {
    getSlashCommandDescription, getSlashCommandLocalizations, getSlashCommandName
} from '../../structures/Language.mts';
import { Command } from '../../utils/otherTypes.mts';

export default {
    name: getSlashCommandName("test"),
    description: getSlashCommandDescription("test"),
    localizations: getSlashCommandLocalizations("test"),
    async execute(client, interaction, es, ls, GuildSettings) {
        interaction.reply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`IT WORKED!!!!!!`)
        ], ephemeral: true})
    }
} as Command