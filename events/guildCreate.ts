import { EmbedBuilder, Guild } from 'discord.js';

import { BotClient } from '../structures/BotClient';

export default async (client: BotClient, guild: Guild) => {
    if (!guild) return;
    if (!guild.available) return;
    client.logger.debug(`Joined a new Guild: ${guild.name} (${guild.id}) | Members: ${guild.memberCount} | Current-Average Members/Guild: ${Math.floor(client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0) / client.guilds.cache.size)}`)
    await client.db.createGuildDatabase(guild.id)
    let theOwner = await guild.fetchOwner()
    let embed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`${client.emoji.join} Joined a New Server`)
        .addFields([
            { name: "Guild Info", value: `>>> \`\`\`${guild.name} (${guild.id})\`\`\``, },
            { name: "Owner Info", value: `>>> \`\`\`${theOwner ? `${theOwner.user.globalName || theOwner.user.username} (${theOwner.id})` : `${theOwner} (${guild.ownerId})`}\`\`\``,  },
            { name: "Member Count", value: `>>> \`\`\`${guild.memberCount}\`\`\``, },
            { name: "Servers Bot is in", value: `>>> \`\`\`${client.guilds.cache.size}\`\`\``, },
            { name: "Leave Server:", value: `>>> \`\`\`/owner leaveserver ${guild.id}\`\`\``, },
        ])
        .setThumbnail(guild.iconURL());
    if (client.logger.options.webhook.serverlog && client.logger.guildWebhook) await client.logger.guildWebhook.send({embeds: [embed]})
}