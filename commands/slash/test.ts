import { ErrySuccessEmbed } from '../../structures/Functions';
import { CommandExport, optionTypes } from '../../utils/otherTypes';

export default {
    options: [
        {
            type: optionTypes.string,
            name: "test",
            required: true,
            autocomplete: true
        }
    ],
    async execute(client, interaction, es, ls, GuildSettings) {
        const option = interaction.options.getString("test")
        await interaction.reply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`IT WORKED!!!!!!`)
                .setFooter(client.functions.getFooter(es, `Option text: ${client.functions.getFooter(es, undefined, option)}`))
        ], ephemeral: true})
    },
    async autocomplete(client, interaction, es, ls, GuildSettings) {
        await interaction.respond([
            {
                name: 'Option 1',
                value: 'option1',
            },
            {
                name: 'Option 2',
                value: 'option2',
            }
        ])
    }
} as CommandExport