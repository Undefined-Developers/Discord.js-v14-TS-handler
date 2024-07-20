import {
    ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, LocaleString,
    PermissionFlagsBits, PermissionsBitField
} from 'discord.js';

import { Settings } from '@prisma/client';

import { cooldowns, Embed } from '../config/config';
import { BotClient } from '../structures/BotClient';
import { ErryErrorEmbed } from '../structures/Functions';
import { Command, ContextCommand } from '../utils/otherTypes';

export function onlySecondDuration(duration: number): string {
    const time = Math.floor(duration / 1000 * 100) / 100;
    return `${time} Sec${time !== 1 ? "s" : ""}`
}

export async function slashCommandHandler(client: BotClient, interaction: ChatInputCommandInteraction, es: Embed, ls: LocaleString, GuildSettings: Settings): Promise<void> {

    const slashCmd = client.commands.get(parseSlashCommandKey(interaction)) as Command;

    if(slashCmd) {
        try {
            if(!(await checkCommand(client, slashCmd, interaction, es, ls))) return;
            var commandName = `${interaction.commandName}${interaction.options.getSubcommandGroup(false) ? `_${interaction.options.getSubcommandGroup(false)}` : ``}${interaction.options.getSubcommand(false) ? `_${interaction.options.getSubcommand(false)}` : ``}`
            client.logger.debug(`Used /${commandName}\n\t\t(${interaction?.guild?.name ? interaction?.guild?.name : "DMS"} (${interaction?.guild?.id}) by ${interaction.user.globalName || interaction.user.username} (${interaction.user.id}))`)
            await slashCmd.execute(client, interaction, es = client.config.embed, ls = client.config.defaultLanguage, GuildSettings);
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
                await interaction.reply({ content: content as string, ephemeral: true }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                }).catch(() => {
                    interaction.channel?.send({ content: content as string }).then(async (msg) => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000)
                    }).catch(() => null);
                })
            }
        }
    }
}

export function parseSlashCommandKey(interaction: ChatInputCommandInteraction): string {
    var keys: string[] = ["slashcmd", interaction.commandName];
    if(interaction.options.getSubcommand(false)) { keys.push(`${interaction.options.getSubcommand(false)}`); keys[0] = "subcmd"; }
    if(interaction.options.getSubcommandGroup(false)) { keys.splice(1, 0, `${interaction.options.getSubcommandGroup(false)}`); keys[0] = "groupcmd"; }
    return keys.join("_");
}

export async function checkCommand(client: BotClient, command: Command|ContextCommand, ctx: ChatInputCommandInteraction, es: Embed, ls: LocaleString, dontCheckCooldown?: boolean) {
    if(command.mustPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.mustPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            return await ctx.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor(es.wrongcolor)
                        .setTitle(client.lang.translate("common.noperms1", ls))
                        //.setDescription(`>>> ${client.functions.translatePermissions(new PermissionsBitField(command.mustPermissions).toArray(), ls).map(x => `\`${x}\``).join(", ")}`)
                ]
            }).catch(() => null), false;
        }
    }    

    if(command.allowedPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.allowedPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            return await ctx.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor(es.wrongcolor)
                        .setTitle(client.lang.translate("common.noperms2", ls))
                        //.setDescription(`>>> ${client.functions.translatePermissions(new PermissionsBitField(command.allowedPermissions).toArray(), ls).map(x => `\`${x}\``).join(", ")}`)
                ]
            }).catch(() => null), false;
        }
    }

    if(!dontCheckCooldown && (await isOnCooldown(client, command, ctx, es, ls))) return false;

    return true;
}

export async function isOnCooldown(client: BotClient, command: Command|ContextCommand, ctx: CommandInteraction, es: Embed, ls: LocaleString): Promise<boolean> {
    const [ userId, guildId ] = [ ctx.user.id, ctx.guild?.id ?? "" ];
    
    const defaultCooldown =
        cooldowns.cooldownCategoriesHigh.includes(command.category || "") || cooldowns.cooldownCommandsHigh.includes(command.name)
        ? cooldowns.defaultCooldownMsHigh : 
        cooldowns.cooldownCategories.includes(command.category || "") || cooldowns.cooldownCommands.includes(command.name)
        ? cooldowns.defaultCooldownMs : 0;
    
    if(command.cooldown?.user) {
        const userCooldowns = new Map(JSON.parse(await client.cache.get(`userCooldown_${userId}`) || "[]")) as Map<string, number>;
        const commandCooldown = userCooldowns.get(command.name) || 0;
        if(commandCooldown > Date.now()) {
            return ctx.reply({
                ephemeral: true,
                embeds: [
                    new ErryErrorEmbed(es).addFields({name: client.lang.translate("common.cooldown.cmd", ls), value: client.lang.translate("common.cooldown.cmd_", ls, {time: onlySecondDuration(commandCooldown - Date.now())})})
                ],
            }).catch(() => null), true;
        }
        (userCooldowns as Map<string, number>).set(command.name, Date.now()+(command.cooldown?.user||0))
        await client.cache.set(`userCooldown_${guildId}`, JSON.stringify(Array.from(userCooldowns.entries())));
    }
    if(command.cooldown?.guild ?? defaultCooldown) {
        const guildCooldowns = new Map(JSON.parse(await client.cache.get(`guildCooldown_${userId}`) || "[]")) as Map<string, number>;
        const commandCooldown = guildCooldowns.get(command.name) || 0;
        if(commandCooldown > Date.now()) {
            return ctx.reply({
                ephemeral: true,
                embeds: [
                    new ErryErrorEmbed(es).addFields({name: client.lang.translate("common.cooldown.guild", ls), value: client.lang.translate("common.cooldown.guild_", ls, {time: onlySecondDuration(commandCooldown - Date.now())})})
                ],
            }).catch(() => null), true;
        }
        guildCooldowns.set(command.name, Date.now() + (command.cooldown?.guild ?? defaultCooldown))
        await client.cache.set(`guildCooldown_${guildId}`, JSON.stringify(Array.from(guildCooldowns.entries())));
    }
    const globalCooldowns = JSON.parse(await client.cache.get(`globalCooldown_${userId}`) || "[]");
    const allCools = [...(globalCooldowns || []), Date.now()].filter( x => (Date.now() - x) <= cooldowns.maximumCoolDownCommands.time);
    await client.cache.set(`globalCooldown_${userId}`, JSON.stringify(allCools))
    if(allCools.length > cooldowns.maximumCoolDownCommands.amount) {
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new ErryErrorEmbed(es).addFields({name: client.lang.translate("common.cooldown.global", ls), value: client.lang.translate("common.cooldown.global_", ls, {time: String(cooldowns.maximumCoolDownCommands.time / 1000), amount: String(cooldowns.maximumCoolDownCommands.amount)})})
            ],
        }).catch(() => null), true;
    }
    return false;
}