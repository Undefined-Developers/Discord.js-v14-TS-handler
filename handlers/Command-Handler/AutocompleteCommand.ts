import {
    AutocompleteInteraction, Locale, PermissionFlagsBits, PermissionsBitField
} from 'discord.js';

import { Settings } from '@prisma/client';

import { Embed } from '../../config/config';
import { BotClient } from '../../structures/BotClient';
import { Command } from '../../utils/otherTypes';

export function onlySecondDuration(duration: number): string {
    const time = Math.floor(duration / 1000 * 100) / 100;
    return `${time} Sec${time !== 1 ? "s" : ""}`
}

export async function autocompleteCommandHandler(client: BotClient, interaction: AutocompleteInteraction, es: Embed, ls: Locale, GuildSettings: Settings): Promise<void> {

    const slashCmd = client.commands.get(parseSlashCommandKey(interaction)) as Command;

    if(slashCmd) {
        try {
            if(!(await checkCommand(client, slashCmd, interaction, es, ls))) return;
            let commandName = `${interaction.commandName}${interaction.options.getSubcommandGroup(false) ? `_${interaction.options.getSubcommandGroup(false)}` : ``}${interaction.options.getSubcommand(false) ? `_${interaction.options.getSubcommand(false)}` : ``}`
            client.logger.debug(`Autocomplete called for /${commandName}\n\t\t(${interaction?.guild?.name ? interaction?.guild?.name : "DMS"} (${interaction?.guild?.id}) by ${interaction.user.globalName || interaction.user.username} (${interaction.user.id}))`)
            slashCmd.autocomplete?.(client, interaction, es = client.config.embed, ls = client.config.defaultLanguage, GuildSettings);
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
    let keys: string[] = ["slashcmd", interaction.commandName];
    if(interaction.options.getSubcommand(false)) { keys.push(`${interaction.options.getSubcommand(false)}`); keys[0] = "subcmd"; }
    if(interaction.options.getSubcommandGroup(false)) { keys.splice(1, 0, `${interaction.options.getSubcommandGroup(false)}`); keys[0] = "groupcmd"; }
    return keys.join("_");
}

export async function checkCommand(client: BotClient, command: Command, ctx: AutocompleteInteraction, es: Embed, ls: Locale, dontCheckCooldown?: boolean) {
    if(command.mustPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.mustPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            await ctx.respond([
                {
                    name: client.lang.translate("common.noperms1", ls),
                    value: "error"
                }
            ]).catch(() => null);
            return false;
        }
    }    

    if(command.allowedPermissions?.length) {
        if(ctx.user.id !== ctx.guild?.ownerId && !((ctx.member?.permissions as PermissionsBitField).has(PermissionFlagsBits.Administrator) && command.allowedPermissions.some(x => !((ctx.member?.permissions as PermissionsBitField).has(x))))) {
            await ctx.respond([
                {
                    name: client.lang.translate("common.noperms2", ls),
                    value: "error"
                }
            ]).catch(() => null);
            return false;
        }
    }

    return true;
}