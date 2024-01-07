import { Bot } from "../../bot.js";
import { DiscordComponent } from "../../types/discord.js";
import { Component } from "../component.js";
export declare function transformComponentToDiscordComponent(bot: Bot, payload: Component): DiscordComponent;
