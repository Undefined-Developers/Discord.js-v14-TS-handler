import { Bot } from "../../bot.js";
import { DiscordActivity } from "../../types/discord.js";
import { Activity } from "../activity.js";
export declare function transformActivityToDiscordActivity(bot: Bot, payload: Activity): DiscordActivity;
