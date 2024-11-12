import { Interaction, LocaleString } from 'discord.js';

import { Embed, Settings } from '@prisma/client';

import { Embed as ConfigEmbed } from '../config/config';
import { buttonsOwnerBlacklistList } from '../handlers/Button-Handlers/ButtonsOwnerBlacklistList';
import { autocompleteCommandHandler } from '../handlers/Command-Handler/AutocompleteCommand';
import { contextCommandHandler } from '../handlers/Command-Handler/ContextCommand';
import { slashCommandHandler } from '../handlers/Command-Handler/SlashCommand';
import { interactionBlackListHandler } from '../handlers/InteractionBlacklist';
import { BotClient } from '../structures/BotClient';

export default async (client: BotClient, interaction: Interaction) => {
    if(!interaction.guild) return;

    var GuildSettings = await getGuildSettings(client, interaction.guild.id);
    if (!GuildSettings || !GuildSettings.embed || !GuildSettings.language) {
        await client.db.createGuildDatabase(interaction.guild.id);
        GuildSettings = await getGuildSettings(client, interaction.guild.id);
    }

    var es = GuildSettings?.embed as ConfigEmbed || client.config.embed as ConfigEmbed
    var ls = GuildSettings?.language as LocaleString|undefined || client.config.defaultLanguage

    if (await interactionBlackListHandler(client, interaction, es, ls, GuildSettings)) return;
        
    interaction.isChatInputCommand() && slashCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isContextMenuCommand() && contextCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isAutocomplete() && autocompleteCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isMessageComponent() && runAllComponents();

    async function runAllComponents() {
        buttonsOwnerBlacklistList(client, interaction, es, ls, GuildSettings);
    }
}

async function getGuildSettings(client: BotClient, guildId: string): Promise<Settings&{embed: Embed|null}> {
    var GuildSettings = await client.db.settings.findUnique({
        where: {
            guildId: guildId,
        },
        include: {
            embed: true,
        },
    });
    if (!GuildSettings || !GuildSettings.embed || !GuildSettings.language) {
        await client.db.createGuildDatabase(guildId);
        return GuildSettings = await getGuildSettings(client, guildId);
    }
    return GuildSettings;
}
