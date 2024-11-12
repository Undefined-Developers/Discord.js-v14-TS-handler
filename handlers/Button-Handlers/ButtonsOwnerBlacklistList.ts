import {
    ActionRowBuilder, ButtonBuilder, ButtonStyle, Interaction, LocaleString
} from 'discord.js';

import { Settings } from '@prisma/client';

import { Embed } from '../../config/config';
import { BotClient } from '../../structures/BotClient';
import { ErryErrorEmbed, ErrySuccessEmbed } from '../../structures/Functions';

export async function buttonsOwnerBlacklistList(client: BotClient, interaction: Interaction, es: Embed, ls: LocaleString, GuildSettings: Settings): Promise<void> {
    if (!interaction.isMessageComponent() || !interaction.customId.includes("owner_blacklist_list")) return;

    const type = interaction.message.embeds[0].title?.split(" ")[0];
    var page = parseInt(interaction.message.embeds[0].footer?.text.match(/#(.*?)\//)?.[1] || "1");

    page = (interaction.customId == "owner_blacklist_list:nextButton" ? page+1 : page-1);

    const data = type == "user" ? await client.db.userBlacklist.findMany() : await client.db.guildBlacklist.findMany();

    if (!data) {
        interaction.update({
            embeds: [new ErryErrorEmbed(es).setTitle("Error getting data")]
        });
        return;
    }

    const chunks = Array(Math.ceil(data.length / 5)).fill(0).map((_, i) => data.slice(i * 5, i * 5 + 5));
    const string = chunks[page-1].map(e => `- \`${e.id}\`: ${e.reason}`).join("\n");

    const nextButton = new ButtonBuilder()
        .setCustomId("owner_blacklist_list:nextButton")
        .setLabel("Next")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(chunks.length == page);

    const previousButton = new ButtonBuilder()
        .setCustomId("owner_blacklist_list:previousButton")
        .setLabel("Prev")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(page == 1);

    const actionRow = new ActionRowBuilder().addComponents([previousButton, nextButton]);

    await interaction.update({
        embeds:[
            new ErrySuccessEmbed(es, {footer:true})
                .setTitle(`${type} blacklist:`)
                .setDescription(`${string}`)
                .setFooter({text: `Page #${page}/${chunks.length}`})
        ], 
        components: [
            //@ts-ignore
            actionRow
        ]
    });
}
