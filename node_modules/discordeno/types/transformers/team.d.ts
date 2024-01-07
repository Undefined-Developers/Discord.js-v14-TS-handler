import { Bot } from "../bot.js";
import { DiscordTeam } from "../types/discord.js";
export declare function transformTeam(bot: Bot, payload: DiscordTeam): {
    icon?: bigint | undefined;
    id: bigint;
    name: string;
    members: {
        membershipState: import("../types/shared.js").TeamMembershipStates;
        permissions: "*"[];
        teamId: bigint;
        user: import("./member.js").User;
    }[];
    ownerUserId: bigint;
};
export interface Team extends ReturnType<typeof transformTeam> {
}
