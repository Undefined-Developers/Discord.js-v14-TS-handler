import { Bot } from "../../bot.js";
import { DiscordApplication } from "../../types/discord.js";
import { Application } from "../application.js";
export declare function transformApplicationToDiscordApplication(bot: Bot, payload: Application): DiscordApplication;
