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

        let data =
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

        await interaction.editReply({embeds:[
            new ErrySuccessEmbed(es)
                .setTitle(`Reason for this ${type} ${id} blacklist:`)
                .setDescription(`${data.reason}`)
        ]})
    }
} as CommandExport