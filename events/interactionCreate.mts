import { Interaction, InteractionType, LocaleString } from 'discord.js';

import { Embed } from '../config/config.mts';
import { slashCommandHandler } from '../handlers/SlashCommandHandler.mts';
import { BotClient } from '../structures/BotClient.mts';

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
    var ls: LocaleString = GuildSettings?.language as LocaleString || "en"
    var es: Embed = GuildSettings?.embed as Embed || client.config.embed
    if (!GuildSettings || !ls || !es) {
        await client.functions.createNewGuildDatabase(interaction.guild.id)
        GuildSettings = await client.db.settings.findUniqueOrThrow({
            where: {
              guildId: interaction.guild?.id,
            },
            include: {
                embed: true,
            },
        })
        ls = GuildSettings.language as LocaleString || client.config.defaultLanguage
        es = GuildSettings.embed as Embed || client.config.embed
    }
        
    if(interaction.type === InteractionType.ApplicationCommand) {
        slashCommandHandler(client, interaction, es, ls, GuildSettings);
    }
}