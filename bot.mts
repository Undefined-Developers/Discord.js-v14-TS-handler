import { BotClient } from "./structures/BotClient.mts";

const client = new BotClient();

client.on("ErryLoaded", () => {
    client.logger.info("Now connecting to discord...");
    client.login(client.config.token)
})