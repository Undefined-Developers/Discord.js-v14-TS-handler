import { Bot } from "../bot.js";
import { DiscordApplicationCommandOptionChoice } from "../types/discord.js";
export declare function transformApplicationCommandOptionChoice(bot: Bot, payload: DiscordApplicationCommandOptionChoice): {
    nameLocalizations?: {
        da?: string | undefined;
        de?: string | undefined;
        "en-GB"?: string | undefined;
        "en-US"?: string | undefined;
        "es-ES"?: string | undefined;
        fr?: string | undefined;
        hr?: string | undefined;
        it?: string | undefined;
        lt?: string | undefined;
        hu?: string | undefined;
        nl?: string | undefined;
        no?: string | undefined;
        pl?: string | undefined;
        "pt-BR"?: string | undefined;
        ro?: string | undefined;
        fi?: string | undefined;
        "sv-SE"?: string | undefined;
        vi?: string | undefined;
        tr?: string | undefined;
        cs?: string | undefined;
        el?: string | undefined;
        bg?: string | undefined;
        ru?: string | undefined;
        uk?: string | undefined;
        hi?: string | undefined;
        th?: string | undefined;
        "zh-CN"?: string | undefined;
        ja?: string | undefined;
        "zh-TW"?: string | undefined;
        ko?: string | undefined;
    } | undefined;
    name: string;
    value: string | number;
};
export interface ApplicationCommandOptionChoice extends ReturnType<typeof transformApplicationCommandOptionChoice> {
}
