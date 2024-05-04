import { BotClient } from './structures/BotClient';

const client = new BotClient();

client.on("ErryLoaded", () => {
    client.logger.info("Now connecting to discord...");
    client.login(client.config.token)
})