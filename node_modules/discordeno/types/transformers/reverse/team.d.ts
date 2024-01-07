import { Bot } from "../../bot.js";
import { DiscordTeam } from "../../types/discord.js";
import { Team } from "../team.js";
export declare function transformTeamToDiscordTeam(bot: Bot, payload: Team): DiscordTeam;
