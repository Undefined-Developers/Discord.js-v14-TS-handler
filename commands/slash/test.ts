import { ErrySuccessEmbed } from '../../structures/Functions';
import {
    getSlashCommandDescription, getSlashCommandLocalizations, getSlashCommandName
} from '../../structures/Language';
import { Command, optionTypes } from '../../utils/otherTypes';

export default {
    name: getSlashCommandName("test"),
    description: getSlashCommandDescription("test"),
    localizations: getSlashCommandLocalizations("test"),
    options: [
        {
            type: optionTypes.string,
            name: "test",
            description: "What you think?",
            required: true
        }
    ],
    async execute(client, interaction, es, ls, GuildSettings) {
        const option = interaction.options.getString("test")
        interaction.reply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`IT WORKED!!!!!!`)
                .setFooter(client.functions.getFooter(es, `Option text: ${client.functions.getFooter(es, undefined, option)}`))
        ], ephemeral: true})
    }
} as Command