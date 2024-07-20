import { Interaction, LocaleString } from 'discord.js';

import { Settings } from '@prisma/client';

import { Embed } from '../config/config';
import { BotClient } from '../structures/BotClient';
import { ErryErrorEmbed } from '../structures/Functions';

export async function interactionBlackListHandler(client: BotClient, interaction: Interaction, es: Embed, ls: LocaleString, GuildSettings: Settings): Promise<boolean> {
    const userDB = await client.db.userBlacklist.findUnique({where:{id:interaction.user.id}})
    if (userDB?.reason) {
        interaction.isAutocomplete() && await interaction.respond([
            {name: client.lang.translate('common.blacklist.userInteraction', ls), value: "NOT ALLOWED"}
        ]);
        (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) && await interaction.reply({
            embeds: [
                new ErryErrorEmbed(es)
                    .setTitle(client.lang.translate('common.blacklist.userInteractionBl', ls))
                    .addFields(
                        {name: client.lang.translate('common.blacklist.reason', ls), value: `${userDB.reason}`}
                    )
            ],
            ephemeral: true
        })
        return true;
    }
    if (!interaction.guild?.id) return false;
    const guildDB = await client.db.guildBlacklist.findUnique({where:{id:interaction.guild.id}})
    if (guildDB?.reason) {
        interaction.isAutocomplete() && await interaction.respond([
            {name: client.lang.translate('common.blacklist.guildInteraction', ls), value: "NOT ALLOWED"}
        ]);
        (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) && await interaction.reply({
            embeds: [
                new ErryErrorEmbed(es)
                    .setTitle("This guild have been blacklisted")
                    .addFields(
                        {name: client.lang.translate('common.blacklist.whatToDo', ls), value: client.lang.translate('common.blacklist.guildInteraction_desc', ls)}
                    )
            ],
            ephemeral: true
        })
        return true;
    }
    return false;
}