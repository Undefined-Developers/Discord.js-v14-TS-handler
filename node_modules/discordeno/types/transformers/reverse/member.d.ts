import type { Bot } from "../../bot.js";
import { DiscordMember, DiscordUser } from "../../types/discord.js";
import { Member, User } from "../member.js";
export declare function transformUserToDiscordUser(bot: Bot, payload: User): DiscordUser;
export declare function transformMemberToDiscordMember(bot: Bot, payload: Member): DiscordMember;
