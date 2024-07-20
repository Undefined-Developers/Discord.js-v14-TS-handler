import { LocaleString, Message } from 'discord.js';

import { Embed } from '../config/config';
import { messageBlackListHandler } from '../handlers/MessageBlacklist';
import { BotClient } from '../structures/BotClient';

export default async (client: BotClient, message: Message) => {
    if(!message.guild) return;

    var GuildSettings = await client.db.settings.findUnique({
        where: {
          guildId: message.guild.id,
        },
        include: {
            embed: true,
        },
    })
    var ls: LocaleString = GuildSettings?.language as LocaleString || client.config.defaultLanguage
    var es: Embed = GuildSettings?.embed as Embed || client.config.embed
    if (!GuildSettings || !ls || !es) {
        await client.db.createGuildDatabase(message.guild.id)
        GuildSettings = await client.db.settings.findUniqueOrThrow({
            where: {
              guildId: message.guild?.id,
            },
            include: {
                embed: true,
            },
        })
        ls = GuildSettings?.language as LocaleString || client.config.defaultLanguage
        es = GuildSettings?.embed as Embed || client.config.embed
    }

    if (await messageBlackListHandler(client, message, es, ls, GuildSettings)) return;
        
    // Message Handlers, for example music requets channel (I have no rn)
}