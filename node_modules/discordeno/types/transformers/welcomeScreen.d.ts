import { Bot } from "../bot.js";
import { DiscordWelcomeScreen } from "../types/discord.js";
export declare function transformWelcomeScreen(bot: Bot, payload: DiscordWelcomeScreen): {
    description?: string | undefined;
    welcomeChannels: {
        channelId: bigint;
        description: string;
        emojiId: bigint | undefined;
        emojiName: string | undefined;
    }[];
};
export interface WelcomeScreen extends ReturnType<typeof transformWelcomeScreen> {
}
