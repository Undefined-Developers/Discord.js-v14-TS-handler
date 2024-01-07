import { Bot } from "../bot.js";
import { DiscordInviteCreate } from "../types/discord.js";
export declare function transformInvite(bot: Bot, invite: DiscordInviteCreate): {
    guildId?: bigint | undefined;
    inviter?: {
        avatar?: bigint | undefined;
        locale?: string | undefined;
        flags?: import("../types/shared.js").UserFlags | undefined;
        email?: string | undefined;
        premiumType?: import("../types/shared.js").PremiumTypes | undefined;
        publicFlags?: import("../types/shared.js").UserFlags | undefined;
        id: bigint;
        discriminator: string;
        username: string;
        toggles: import("./mod.js").UserToggles;
    } | undefined;
    targetUser?: {
        avatar?: bigint | undefined;
        locale?: string | undefined;
        flags?: import("../types/shared.js").UserFlags | undefined;
        email?: string | undefined;
        premiumType?: import("../types/shared.js").PremiumTypes | undefined;
        publicFlags?: import("../types/shared.js").UserFlags | undefined;
        id: bigint;
        discriminator: string;
        username: string;
        toggles: import("./mod.js").UserToggles;
    } | undefined;
    targetApplication?: {
        flags?: import("../types/shared.js").ApplicationFlags | undefined;
        guildId?: bigint | undefined;
        slug?: string | undefined;
        icon?: bigint | undefined;
        owner?: {
            avatar?: bigint | undefined;
            locale?: string | undefined;
            flags?: import("../types/shared.js").UserFlags | undefined;
            email?: string | undefined;
            premiumType?: import("../types/shared.js").PremiumTypes | undefined;
            publicFlags?: import("../types/shared.js").UserFlags | undefined;
            id: bigint;
            discriminator: string;
            username: string;
            toggles: import("./mod.js").UserToggles;
        } | undefined;
        team?: {
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
        } | undefined;
        rpcOrigins?: string[] | undefined;
        termsOfServiceUrl?: string | undefined;
        privacyPolicyUrl?: string | undefined;
        primarySkuId?: string | undefined;
        coverImage?: bigint | undefined;
        description: string;
        id: bigint;
        name: string;
        botPublic: boolean;
        botRequireCodeGrant: boolean;
        verifyKey: string;
    } | undefined;
    code: string;
    temporary: boolean;
    uses: number;
    createdAt: number;
    channelId: bigint;
    maxAge: number;
    maxUses: number;
    targetType: import("../types/shared.js").TargetTypes;
};
export interface Invite extends ReturnType<typeof transformInvite> {
}
