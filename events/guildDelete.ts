import { EmbedBuilder, Guild } from 'discord.js';

import { BotClient } from '../structures/BotClient';

export default async (client: BotClient, guild: Guild) => {
    if (!guild) return;
    if (!guild.available) return;
    client.logger.debug(`Left from Guild: ${guild.name} (${guild.id}) | Members: ${guild.memberCount} | Current-Average Members/Guild: ${Math.floor(client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0) / client.guilds.cache.size)}`)
    client.db.removeGuildDatabase(guild.id)
    var theOwner = await guild.fetchOwner()
    let embed = new EmbedBuilder()
        .setColor(client.config.embed.wrongcolor)
        .setTitle(`${client.emoji.leave} Left from Server`)
        .addFields([
            { name: "Guild Info", value: `>>> \`\`\`${guild.name} (${guild.id})\`\`\``, },
            { name: "Owner Info", value: `>>> \`\`\`${theOwner ? `${theOwner.user.globalName || theOwner.user.username} (${theOwner.id})` : `${theOwner} (${guild.ownerId})`}\`\`\``,  },
            { name: "Member Count", value: `>>> \`\`\`${guild.memberCount}\`\`\``, },
            { name: "Servers Bot is in", value: `>>> \`\`\`${client.guilds.cache.size}\`\`\``, },
        ])
        .setThumbnail(guild.iconURL());
    if (client.logger.options.webhook.serverlog && client.logger.webhook) client.logger.webhook.send({embeds: [embed]})
}