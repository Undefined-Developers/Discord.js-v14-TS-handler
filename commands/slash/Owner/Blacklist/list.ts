import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

import { ErrySuccessEmbed, ErryWarningEmbed } from '../../../../structures/Functions';
import { CommandExport, optionTypes } from '../../../../utils/otherTypes';

export default {
    options: [
        {
            type: optionTypes.stringChoices,
            name: "type",
            required: true,
            choices: [
                {name: "User", value: "user"},
                {name: "Guild", value: "guild"}
            ],
        }
    ],
    async execute(client, interaction, es, ls, GuildSettings) {
        await interaction.deferReply()

        const type = interaction.options.getString("type")

        if (!type) 
            return interaction.editReply({embeds:[
                new ErryWarningEmbed(es)
                    .setTitle("You need to provide all data")
            ]})

        var data = 
            type == "user" ? 
                await client.db.userBlacklist.findMany()
            : 
                await client.db.guildBlacklist.findMany()
        
        if (!data) {
            return await interaction.editReply({embeds:[
                new ErryWarningEmbed(es)
                    .setTitle(`This ${type} don't have any records`)
            ]})
        }

        const nextButton = new ButtonBuilder()
            .setCustomId("owner_blacklist_list:nextButton")
            .setLabel("Next")
            .setStyle(ButtonStyle.Primary)

        const previousButton = new ButtonBuilder()
            .setCustomId("owner_blacklist_list:previousButton")
            .setLabel("Prev")
            .setStyle(ButtonStyle.Primary)
            .setDisabled()
            
        const chunks = [];
        for (let i = 0; i < data.length; i += 5) {
            chunks.push(data.slice(i, i + 5));
        }
            
        const string = chunks[0].map(e => `- \`${e.id}\`: ${e.reason}`).join("\n")

        if (chunks.length == 1) nextButton.setDisabled()
            
        const actionRow = new ActionRowBuilder().addComponents([previousButton, nextButton])

        await interaction.editReply({
            embeds:[
                new ErrySuccessEmbed(es, {footer:true})
                    .setTitle(`${type} blacklist:`)
                    .setDescription(`${string}`)
                    .setFooter({text: `Page #1/${chunks.length}`})
            ], 
            components: [
                //@ts-ignore
                actionRow
            ]
        })
    }
} as CommandExport