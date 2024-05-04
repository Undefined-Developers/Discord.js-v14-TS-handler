import { ErrySuccessEmbed } from '../../structures/Functions';
import {
    getSlashCommandDescription, getSlashCommandLocalizations, getSlashCommandName
} from '../../structures/Language';
import { Command } from '../../utils/otherTypes';

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