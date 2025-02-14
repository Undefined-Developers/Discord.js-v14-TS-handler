import { BotClient } from '../structures/BotClient';

export default async (client: BotClient) => {
    try {
        client.logger.success(`Discord Bot is ready as ${client.user?.globalName || client.user?.username}`);
        await client.functions.statusUpdater();
        setInterval(() => client.functions.statusUpdater(), 10e3)
        await client.publishCommands(client.config.devGuilds || undefined);
        await client.prepareCommands();
    }catch(e) {client.logger.error(e as Error)}
}