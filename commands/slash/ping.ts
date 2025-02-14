import { ErrySuccessEmbed } from '../../structures/Functions.ts';
import {CommandExport, contexts} from '../../utils/otherTypes.ts';

export default {
    contexts: [contexts.dm, contexts.guild],
    async execute(client, interaction, es, ls, GuildSettings) {
        await interaction.reply({
            embeds: [
                new ErrySuccessEmbed(es)
                    .setDescription(client.lang.translate("commands.ping.reply", ls, {ping: `${client.ws.ping}`, dbping: `${await client.db.getPing()}`}))
            ]
        })
    }
} as CommandExport