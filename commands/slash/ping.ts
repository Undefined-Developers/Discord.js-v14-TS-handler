import { ErrySuccessEmbed } from '../../structures/Functions';
import { Command } from '../../utils/otherTypes';

export default {
    async execute(client, interaction, es, ls, GuildSettings) {
        await interaction.reply({
            embeds: [
                new ErrySuccessEmbed(es)
                    .setDescription(client.lang.translate("commands.ping.reply", ls, {ping: `${client.ws.ping}`}))
            ]
        })
    }
} as Command