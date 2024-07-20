import { LocaleString, Message } from 'discord.js';

import { Settings } from '@prisma/client';

import { Embed } from '../config/config';
import { BotClient } from '../structures/BotClient';

export async function messageBlackListHandler(client: BotClient, message: Message, es: Embed, ls: LocaleString, GuildSettings: Settings): Promise<boolean> {
    const userDB = await client.db.userBlacklist.findUnique({where:{id:message.author.id}})
    if (userDB?.reason) return true;
    if (!message.guild?.id) return false;
    const guildDB = await client.db.guildBlacklist.findUnique({where:{id:message.guild.id}})
    if (guildDB?.reason) return true;
    return false;
}