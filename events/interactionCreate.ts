import { Interaction, Locale } from 'discord.js';

import { Embed, Settings } from '@prisma/client';

import { Embed as ConfigEmbed } from '../config/config';
import { buttonsOwnerBlacklistList } from '../handlers/Button-Handlers/ButtonsOwnerBlacklistList';
import { autocompleteCommandHandler } from '../handlers/Command-Handler/AutocompleteCommand';
import { contextCommandHandler } from '../handlers/Command-Handler/ContextCommand';
import { slashCommandHandler } from '../handlers/Command-Handler/SlashCommand';
import { interactionBlackListHandler } from '../handlers/InteractionBlacklist';
import { BotClient } from '../structures/BotClient';

export default async (client: BotClient, interaction: Interaction) => {
    let GuildSettings: Settings & {embed: Embed | null} = await getGuildSettings(client, interaction.guild?.id)

    let es = GuildSettings?.embed as ConfigEmbed || client.config.embed as ConfigEmbed
    let ls = GuildSettings?.language as Locale|undefined || client.config.defaultLanguage

    if (await interactionBlackListHandler(client, interaction, es, ls, GuildSettings)) return;
        
    interaction.isChatInputCommand() && await slashCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isContextMenuCommand() && await contextCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isAutocomplete() && await autocompleteCommandHandler(client, interaction, es, ls, GuildSettings);
    interaction.isMessageComponent() && await runAllComponents();

    async function runAllComponents() {
        await buttonsOwnerBlacklistList(client, interaction, es, ls, GuildSettings);
    }
}

async function getGuildSettings(client: BotClient, guildId?: string, num: number = 0): Promise<Settings&{embed: Embed|null}> {
    if (!guildId || num >= 4) {
        return {
            ...client.db.InitialSettingsDatabase,
            embed: {
                ...client.db.InitialEmbedDatabase
            }
        };
    }
    let GuildSettings = await client.db.settings.findUnique({
        where: {
            guildId: guildId,
        },
        include: {
            embed: true,
        },
    });
    if (!GuildSettings || !GuildSettings.embed || !GuildSettings.language) {
        await client.db.createGuildDatabase(guildId);
        GuildSettings = await getGuildSettings(client, guildId, num+1);
    }
    return GuildSettings;
}
