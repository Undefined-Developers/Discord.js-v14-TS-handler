import { ErrySuccessEmbed } from '../../structures/Functions.mts';
import { ContextCommand } from '../../utils/otherTypes.mts';

export default {
    name: "test",
    type: "Message", // "Message" or "User" only
    async execute(client, interaction, es, ls, GuildSettings) {
        interaction.reply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`IT WORKED!!!!!!`)
                .setFooter({text: `Used on message with id: ${interaction.targetId}`})
        ], ephemeral: true})
    }
} as ContextCommand