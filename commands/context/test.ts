import { ErrySuccessEmbed } from '../../structures/Functions';
import { ContextCommand, contextTypes } from '../../utils/otherTypes';

export default {
    name: "test",
    type: contextTypes.message, // "message" or "user" only
    async execute(client, interaction, es, ls, GuildSettings) {
        await interaction.reply({
            embeds:[
                new ErrySuccessEmbed(es)
                    .setTitle(`IT WORKED!!!!!!`)
                    .setFooter({text: `Used on message with id: ${interaction.targetId}`})
            ],
            flags: [
                'Ephemeral'
            ],
        })
    }
} as ContextCommand