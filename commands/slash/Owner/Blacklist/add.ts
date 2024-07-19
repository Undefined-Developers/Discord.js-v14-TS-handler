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
        },
        {
            type: optionTypes.string,
            name: "id",
            required: true
        },
        {
            type: optionTypes.string,
            name: "reason",
            required: true
        }
    ],
    async execute(client, interaction, es, ls, GuildSettings) {
        await interaction.deferReply()

        const type = interaction.options.getString("type")
        const id = interaction.options.getString("id")
        const reason = interaction.options.getString("reason")

        if (!type || !id || !reason) 
            return interaction.editReply({embeds:[
                new ErryWarningEmbed(es)
                    .setTitle("You need to provide all data")
            ]})

        var data = 
            type == "user" ? 
                await client.db.userBlacklist.findUnique({where:{id:id}}) 
            : 
                await client.db.guildBlacklist.findUnique({where:{id:id}})
        
        if (data) {
            return await interaction.editReply({embeds:[
                new ErryWarningEmbed(es)
                    .setTitle(`This ${type} already been blacklisted with reason:`)
                    .setDescription(`\`\`\`${data.reason}\`\`\``)
            ]})
        }

        type == "user" ? 
            await client.db.userBlacklist.create({
                data:{
                    id: id,
                    reason: reason
                }
            }) 
        : 
            await client.db.guildBlacklist.create({
                data:{
                    id: id,
                    reason: reason
                }
            }) 

        await interaction.editReply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`Added ${type} ${id} to blacklist`)
        ]})
    }
} as CommandExport