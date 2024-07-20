import {
    AutocompleteInteraction, LocaleString, PermissionFlagsBits, PermissionsBitField
} from 'discord.js';

import { Settings } from '@prisma/client';

import { cooldowns, Embed } from '../config/config';
import { BotClient } from '../structures/BotClient';
import { Command } from '../utils/otherTypes';

export function onlySecondDuration(duration: number): string {
    const time = Math.floor(duration / 1000 * 100) / 100;
    return `${time} Sec${time !== 1 ? "s" : ""}`
}

export async function autocompleteCommandHandler(client: BotClient, interaction: AutocompleteInteraction, es: Embed, ls: LocaleString, GuildSettings: Settings): Promise<void> {

    const slashCmd = client.commands.get(parseSlashCommandKey(interaction)) as Command;

    if(slashCmd) {
        try {
            if(!(await checkCommand(client, slashCmd, interaction, es, ls))) return;
            var commandName = `${interaction.commandName}${interaction.options.getSubcommandGroup(false) ? `_${interaction.options.getSubcommandGroup(false)}` : ``}${interaction.options.getSubcommand(false) ? `_${interaction.options.getSubcommand(false)}` : ``}`
            client.logger.debug(`Autocomplete called for /${commandName}\n\t\t(${interaction?.guild?.name ? interaction?.guild?.name : "DMS"} (${interaction?.guild?.id}) by ${interaction.user.globalName || interaction.user.username} (${interaction.user.id}))`)
            await slashCmd.autocomplete?.(client, interaction, es = client.config.embed, ls = client.config.defaultLanguage, GuildSettings);
        } catch (e) {
            client.logger.error(e as Error);client.logger.debug(`Error is for guild ${interaction.guild?.id}`)
            const content = client.lang.translate("common.error", ls, {command: slashCmd?.name || "???", error: String((e as Error)?.message ?? e).substring(0, 25)})
            if(!interaction.responded) {
                await interaction.respond([
                    {
                        name: content,
                        value: 'error',
                    }
                ])
            }
        }
    }
}

export function parseSlashCommandKey(interaction: AutocompleteInteraction): string {
    var keys: string[] = ["slashcmd", interaction.commandName];
    if(interaction.options.getSubcommand(false)) { keys.push(`${interaction.options.getSubcommand(false)}`); keys[0] = "subcmd"; }
    if(interaction.options.getSubcommandGroup(false)) { keys.splice(1, 0, `${interaction.options.getSubcommandGroup(false)}`); keys[0] = "groupcmd"; }
    return keys.join("_");
}

export async function checkCommand(client: BotClient, command: Command, ctx: AutocompleteInteraction, es: Embed, ls: LocaleString, dontCheckCooldown?: boolean) {
    if(command.mustPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.mustPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            return await ctx.respond([
                {
                    name: client.lang.translate("common.noperms1", ls),
                    value: "error"
                }
            ]).catch(() => null), false;
        }
    }    

    if(command.allowedPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.allowedPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            return await ctx.respond([
                {
                    name: client.lang.translate("common.noperms2", ls),
                    value: "error"
                }
            ]).catch(() => null), false;
        }
    }

    if(!dontCheckCooldown && (await isOnCooldown(client, command, ctx, es, ls))) return false;

    return true;
}

export async function isOnCooldown(client: BotClient, command: Command, ctx: AutocompleteInteraction, es: Embed, ls: LocaleString): Promise<boolean> {
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
            return await ctx.respond([
                {
                    name: client.lang.translate("common.cooldown.cmd_", ls, {time: onlySecondDuration(commandCooldown - Date.now())}),
                    value: "error"
                }
            ]).catch(() => null), true;
        }
        (userCooldowns as Map<string, number>).set(command.name, Date.now()+(command.cooldown?.user||0))
        await client.cache.set(`userCooldown_${guildId}`, JSON.stringify(Array.from(userCooldowns.entries())));
    }
    if(command.cooldown?.guild ?? defaultCooldown) {
        const guildCooldowns = new Map(JSON.parse(await client.cache.get(`guildCooldown_${userId}`) || "[]")) as Map<string, number>;
        const commandCooldown = guildCooldowns.get(command.name) || 0;
        if(commandCooldown > Date.now()) {
            return await ctx.respond([
                {
                    name: client.lang.translate("common.cooldown.guild_", ls, {time: onlySecondDuration(commandCooldown - Date.now())}),
                    value: "error"
                }
            ]).catch(() => null), true;
        }
        guildCooldowns.set(command.name, Date.now() + (command.cooldown?.guild ?? defaultCooldown))
        await client.cache.set(`guildCooldown_${guildId}`, JSON.stringify(Array.from(guildCooldowns.entries())));
    }
    const globalCooldowns = JSON.parse(await client.cache.get(`globalCooldown_${userId}`) || "[]");
    const allCools = [...(globalCooldowns || []), Date.now()].filter( x => (Date.now() - x) <= cooldowns.maximumCoolDownCommands.time);
    await client.cache.set(`globalCooldown_${userId}`, JSON.stringify(allCools))
    if(allCools.length > cooldowns.maximumCoolDownCommands.amount) {
        return await ctx.respond([
            {
                name: client.lang.translate("common.cooldown.global_", ls, {time: String(cooldowns.maximumCoolDownCommands.time / 1000), amount: String(cooldowns.maximumCoolDownCommands.amount)}),
                value: "error"
            }
        ]).catch(() => null), true;
    }
    return false;
}