import { BotClient } from '../structures/BotClient.mts';

export default (client: BotClient) => {
    process.on('unhandledRejection', (reason, p) => {
        client.logger.error(reason as Error);
    });
    process.on("uncaughtException", (err, origin) => {
        client.logger.error(err);
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.logger.error(err);
    });
}