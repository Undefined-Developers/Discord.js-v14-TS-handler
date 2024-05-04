import { BotClient } from '../structures/BotClient';

export default async (client: BotClient) => {
    try {
        client.logger.info(`Discord Bot is ready as ${client.user?.globalName || client.user?.username}`);
        client.functions.statusUpdater(); 
        setInterval(() => client.functions.statusUpdater(), 10e3)
        await client.publishCommands(client.config.adminGuilds || undefined);
        client.prepareCommands();
    }catch(e) {client.logger.error(e as Error)}
}