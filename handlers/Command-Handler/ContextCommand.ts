import {
    EmbedBuilder, GuildTextBasedChannel, Locale, MessageContextMenuCommandInteraction,
    PermissionFlagsBits, PermissionsBitField, UserContextMenuCommandInteraction
} from 'discord.js';

import { Settings } from '@prisma/client';

import {
    MessageFlags,
} from 'discord-api-types/v10';

import { cooldowns, Embed } from '../../config/config';
import { BotClient } from '../../structures/BotClient';
import { ErryErrorEmbed } from '../../structures/Functions';
import { ContextCommand } from '../../utils/otherTypes';

export function onlySecondDuration(duration: number): string {
    const time = Math.floor(duration / 1000 * 100) / 100;
    return `${time} Sec${time !== 1 ? "s" : ""}`
}

export async function contextCommandHandler(client: BotClient, interaction: MessageContextMenuCommandInteraction|UserContextMenuCommandInteraction, es: Embed, ls: Locale, GuildSettings: Settings): Promise<void> {

    const slashCmd = client.commands.get(parseSlashCommandKey(interaction)) as ContextCommand;

    if(slashCmd) {
        try {
            if(!(await checkCommand(client, slashCmd, interaction, es, ls))) return;
            let commandName = 'shortName' in slashCmd && slashCmd.shortName
            client.logger.debug(`Used Context /${commandName}\n\t\t(${interaction?.guild?.name ? interaction?.guild?.name : "DMS"} (${interaction?.guild?.id}) by ${interaction.user.globalName || interaction.user.username} (${interaction.user.id}))`)
            slashCmd.execute(client, interaction, es = client.config.embed, ls = client.config.defaultLanguage, GuildSettings);
        } catch (e) {
            client.logger.error(e as Error);client.logger.debug(`Error is for guild ${interaction.guild?.id}`)
            const content = client.lang.translate("common.error", ls, {command: slashCmd?.name || "???", error: String((e as Error)?.message ?? e).substring(0, 500)})
            if(interaction.replied) {
                await interaction.editReply({ content: content as string }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                }).catch(() => null);
            } else {
                await interaction.reply({ content: content as string, flags: [MessageFlags.Ephemeral] }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                }).catch(() => {
                    (interaction.channel as GuildTextBasedChannel)?.send({ content: content as string }).then(async (msg) => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000)
                    }).catch(() => null);
                })
            }
        }
    }
}

export function parseSlashCommandKey(interaction: MessageContextMenuCommandInteraction|UserContextMenuCommandInteraction): string {
    let keys: string[] = ["context", interaction.commandName];
    return keys.join("_");
}

export async function checkCommand(client: BotClient, command: ContextCommand, ctx: MessageContextMenuCommandInteraction|UserContextMenuCommandInteraction, es: Embed, ls: Locale, dontCheckCooldown?: boolean) {
    if(command.mustPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.mustPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            await ctx.reply({
                flags: [
                    MessageFlags.Ephemeral,
                ],
                embeds: [
                    new EmbedBuilder()
                        .setColor(es.wrongcolor)
                        .setTitle(client.lang.translate("common.noperms1", ls))
                        //.setDescription(`>>> ${client.functions.translatePermissions(new PermissionsBitField(command.mustPermissions).toArray(), ls).map(x => `\`${x}\``).join(", ")}`)
                ]
            }).catch(() => null);
            return false;
        }
    }    

    if(command.allowedPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.allowedPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            await ctx.reply({
                flags: [
                    MessageFlags.Ephemeral,
                ],
                embeds: [
                    new EmbedBuilder()
                        .setColor(es.wrongcolor)
                        .setTitle(client.lang.translate("common.noperms2", ls))
                        //.setDescription(`>>> ${client.functions.translatePermissions(new PermissionsBitField(command.allowedPermissions).toArray(), ls).map(x => `\`${x}\``).join(", ")}`)
                ]
            }).catch(() => null);
            return false;
        }
    }

    return !(!dontCheckCooldown && (await isOnCooldown(client, command, ctx, es, ls)));


}

export async function isOnCooldown(client: BotClient, command: ContextCommand, ctx: MessageContextMenuCommandInteraction|UserContextMenuCommandInteraction, es: Embed, ls: Locale): Promise<boolean> {
    const [ userId, guildId ] = [ ctx.user.id, ctx.guild?.id ?? "" ];
    
    const defaultCooldown =
        cooldowns.cooldownCategoriesHigh.includes(command.category || "") || cooldowns.cooldownCommandsHigh.includes(command.name)
        ? cooldowns.defaultCooldownMsHigh :
            cooldowns.defaultCooldownMs;
    
    if(command.cooldown?.user ?? defaultCooldown) {
        const userCooldowns = new Map(JSON.parse(await client.cache.get(`userCooldown_${userId}`) || "[]")) as Map<string, number>;
        const commandCooldown = userCooldowns.get(command.name) || 0;
        if(commandCooldown > Date.now()) {
            ctx.reply({
                flags: [
                    MessageFlags.Ephemeral,
                ],
                embeds: [
                    new ErryErrorEmbed(es).addFields({name: client.lang.translate("common.cooldown.cmd", ls), value: client.lang.translate("common.cooldown.cmd_", ls, {time: onlySecondDuration(commandCooldown - Date.now())})})
                ],
            }).catch(() => null);
            return true;
        }
        (userCooldowns as Map<string, number>).set(command.name, Date.now()+(command.cooldown?.user||0))
        await client.cache.set(`userCooldown_${userId}`, JSON.stringify(Array.from(userCooldowns.entries())));
    }
    if(command.cooldown?.guild && guildId) {
        const guildCooldowns = new Map(JSON.parse(await client.cache.get(`guildCooldown_${guildId}`) || "[]")) as Map<string, number>;
        const commandCooldown = guildCooldowns.get(command.name) || 0;
        if(commandCooldown > Date.now()) {
            ctx.reply({
                flags: [
                    MessageFlags.Ephemeral,
                ],
                embeds: [
                    new ErryErrorEmbed(es).addFields({name: client.lang.translate("common.cooldown.guild", ls), value: client.lang.translate("common.cooldown.guild_", ls, {time: onlySecondDuration(commandCooldown - Date.now())})})
                ],
            }).catch(() => null);
            return true;
        }
        guildCooldowns.set(command.name, Date.now() + (command.cooldown?.guild ?? defaultCooldown))
        await client.cache.set(`guildCooldown_${guildId}`, JSON.stringify(Array.from(guildCooldowns.entries())));
    }
    const globalCooldowns = JSON.parse(await client.cache.get(`globalCooldown_${userId}`) || "[]");
    const allCools = [...(globalCooldowns || []), Date.now()].filter( x => (Date.now() - x) <= cooldowns.maximumCoolDownCommands.time);
    await client.cache.set(`globalCooldown_${userId}`, JSON.stringify(allCools))
    if(allCools.length > cooldowns.maximumCoolDownCommands.amount) {
        ctx.reply({
            flags: [
                MessageFlags.Ephemeral,
            ],
            embeds: [
                new ErryErrorEmbed(es).addFields({name: client.lang.translate("common.cooldown.global", ls), value: client.lang.translate("common.cooldown.global_", ls, {time: String(cooldowns.maximumCoolDownCommands.time / 1000), amount: String(cooldowns.maximumCoolDownCommands.amount)})})
            ],
        }).catch(() => null);
        return true;
    }
    return false;
}