import { ErrySuccessEmbed } from '../../structures/Functions';
import {CommandExport, contexts, optionTypes} from '../../utils/otherTypes';

export default {
    options: [
        {
            type: optionTypes.string,
            name: "test",
            required: true,
            autocomplete: true
        }
    ],
    contexts: [
        contexts.guild,
        contexts.dm,       // Make command available withing DMs with bot
        //contexts.groupDm   // Make command available withing group DMs with bot
        // P.S. Contexts only works with Slash groups (main group) and just commands like this one. This is I believe limitation of discord.js. At least for now
    ],
    async execute(client, interaction, es, ls, GuildSettings) {
        const option = interaction.options.getString("test")
        await interaction.reply({
            embeds:[
                new ErrySuccessEmbed(es)
                    .setTitle(`IT WORKED!!!!!!`)
                    .setFooter(client.functions.getFooter(es, `Option text: ${client.functions.getFooter(es, undefined, option)}`))
            ],
            flags: [ // New way of sending Ephemeral message. All flags: 'Ephemeral' | 'SuppressEmbeds' | 'SuppressNotifications'
                'Ephemeral'
            ]
        })
    },
    async autocomplete(client, interaction, es, ls, GuildSettings) {
        // You can make database requests and return something dynamic tho
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