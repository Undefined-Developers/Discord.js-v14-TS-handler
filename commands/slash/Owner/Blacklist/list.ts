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
        const id = interaction.options.getString("id")

        if (!type || !id) 
            return interaction.editReply({embeds:[
                new ErryWarningEmbed(es)
                    .setTitle("You need to provide all data")
            ]})

        var data = 
            type == "user" ? 
                await client.db.userBlacklist.findUnique({where:{id:id}}) 
            : 
                await client.db.guildBlacklist.findUnique({where:{id:id}})
        
        if (!data) {
            return await interaction.editReply({embeds:[
                new ErryWarningEmbed(es)
                    .setTitle(`This ${type} isn't found in blacklist`)
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

        const actionRow = new ActionRowBuilder().addComponents([nextButton, previousButton])

        await interaction.editReply({
            embeds:[
                new ErrySuccessEmbed(es)
                    .setTitle(`${type} blacklist:`)
                    .setDescription(`${data.reason}`)
            ], 
            components: [
                //@ts-ignore
                actionRow
            ]
        })
    }
} as CommandExport