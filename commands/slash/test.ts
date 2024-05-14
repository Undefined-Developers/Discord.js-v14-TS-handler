import { ErrySuccessEmbed } from '../../structures/Functions';
import { CommandExport, optionTypes } from '../../utils/otherTypes';

export default {
    options: [
        {
            type: optionTypes.string,
            name: "test",
            description: "What you think?",
            required: true
        }
    ],
    async execute(client, interaction, es, ls, GuildSettings) {
        //@ts-ignore
        const option = interaction.options.getString("test")
        interaction.reply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`IT WORKED!!!!!!`)
                .setFooter(client.functions.getFooter(es, `Option text: ${client.functions.getFooter(es, undefined, option)}`))
        ], ephemeral: true})
    }
} as CommandExport