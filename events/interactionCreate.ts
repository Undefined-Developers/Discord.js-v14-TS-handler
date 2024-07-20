import { Interaction, LocaleString } from 'discord.js';

import { Embed } from '../config/config';
import { autocompleteCommandHandler } from '../handlers/AutocompleteCommandHandler';
import { contextCommandHandler } from '../handlers/ContextCommandHandler';
import { interactionBlackListHandler } from '../handlers/InteractionBlacklistHandler';
import { slashCommandHandler } from '../handlers/SlashCommandHandler';
import { BotClient } from '../structures/BotClient';

export default async (client: BotClient, interaction: Interaction) => {
    if(!interaction.guild) return;

    var GuildSettings = await client.db.settings.findUnique({
        where: {
          guildId: interaction.guild?.id,
        },
        include: {
            embed: true,
        },
    })
    var ls: LocaleString = GuildSettings?.language as LocaleString || client.config.defaultLanguage
    var es: Embed = GuildSettings?.embed as Embed || client.config.embed
    if (!GuildSettings || !ls || !es) {
        await client.db.createGuildDatabase(interaction.guild.id)
        GuildSettings = await client.db.settings.findUniqueOrThrow({
            where: {
              guildId: interaction.guild?.id,
            },
            include: {
                embed: true,
            },
        })
        ls = GuildSettings?.language as LocaleString || client.config.defaultLanguage
        es = GuildSettings?.embed as Embed || client.config.embed
    }

    if (await interactionBlackListHandler(client, interaction, es, ls, GuildSettings)) return;
        
    interaction.isChatInputCommand() && slashCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isContextMenuCommand() && contextCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isAutocomplete() && autocompleteCommandHandler(client, interaction, es, ls, GuildSettings);
}