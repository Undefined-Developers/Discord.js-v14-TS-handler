import { DiscordGuild } from "../../types/discord.js";
import { ToggleBitfieldBigint } from "./ToggleBitfield.js";
export declare const GuildToggle: {
    /** Whether the bot is the owner of the guild */
    owner: bigint;
    /** Whether the server widget is enabled */
    widgetEnabled: bigint;
    /** Whether this is considered a large guild */
    large: bigint;
    /** Whether this guild is unavailable due to an outage */
    unavailable: bigint;
    /** Whether the guild has the boost progress bar enabled */
    premiumProgressBarEnabled: bigint;
    /** Whether the guild has access to set an invite splash background */
    inviteSplash: bigint;
    /** Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
    vipRegions: bigint;
    /** Whether the guild has access to set a vanity URL */
    vanityUrl: bigint;
    /** Whether the guild is verified */
    verified: bigint;
    /** Whether the guild is partnered */
    partnered: bigint;
    /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
    community: bigint;
    /** Whether the guild has access to use commerce features (i.e. create store channels) */
    commerce: bigint;
    /** Whether the guild has access to create news channels */
    news: bigint;
    /** Whether the guild is able to be discovered in the directory */
    discoverable: bigint;
    /** Whether the guild cannot be discoverable */
    discoverableDisabled: bigint;
    /** Whether the guild is able to be featured in the directory */
    feature: bigint;
    /** Whether the guild has access to set an animated guild icon */
    animatedIcon: bigint;
    /** Whether the guild has access to set a guild banner image */
    banner: bigint;
    /** Whether the guild has enabled the welcome screen */
    welcomeScreenEnabled: bigint;
    /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
    memberVerificationGateEnabled: bigint;
    /** Whether the guild can be previewed before joining via Membership Screening or the directory */
    previewEnabled: bigint;
    /** Whether the guild has enabled ticketed events */
    ticketedEventsEnabled: bigint;
    /** Whether the guild has enabled monetization */
    monetizationEnabled: bigint;
    /** Whether the guild has increased custom sticker slots */
    moreStickers: bigint;
    /** Whether the guild has access to create private threads */
    privateThreads: bigint;
    /** Whether the guild is able to set role icons */
    roleIcons: bigint;
};
export declare class GuildToggles extends ToggleBitfieldBigint {
    constructor(guild: DiscordGuild);
    /** Whether the bot is the owner of the guild */
    get owner(): boolean;
    /** Whether the server widget is enabled */
    get widgetEnabled(): boolean;
    /** Whether this is considered a large guild */
    get large(): boolean;
    /** Whether this guild is unavailable due to an outage */
    get unavailable(): boolean;
    /** Whether the guild has the boost progress bar enabled */
    get premiumProgressBarEnabled(): boolean;
    /** Whether the guild has access to set an invite splash background */
    get inviteSplash(): boolean;
    /** Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
    get vipRegions(): boolean;
    /** Whether the guild has access to set a vanity URL */
    get vanityUrl(): boolean;
    /** Whether the guild is verified */
    get verified(): boolean;
    /** Whether the guild is partnered */
    get partnered(): boolean;
    /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
    get community(): boolean;
    /** Whether the guild has access to use commerce features (i.e. create store channels) */
    get commerce(): boolean;
    /** Whether the guild has access to create news channels */
    get news(): boolean;
    /** Whether the guild is able to be discovered in the directory */
    get discoverable(): boolean;
    /** Whether the guild cannot be discoverable */
    get discoverableDisabled(): boolean;
    /** Whether the guild is able to be featured in the directory */
    get feature(): boolean;
    /** Whether the guild has access to set an animated guild icon */
    get animatedIcon(): boolean;
    /** Whether the guild has access to set a guild banner image */
    get banner(): boolean;
    /** Whether the guild has enabled the welcome screen */
    get welcomeScreenEnabled(): boolean;
    /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
    get memberVerificationGateEnabled(): boolean;
    /** Whether the guild can be previewed before joining via Membership Screening or the directory */
    get previewEnabled(): boolean;
    /** Whether the guild has enabled ticketed events */
    get ticketedEventsEnabled(): boolean;
    /** Whether the guild has enabled monetization */
    get monetizationEnabled(): boolean;
    /** Whether the guild has increased custom sticker slots */
    get moreStickers(): boolean;
    /** Whether the guild has access to create private threads */
    get privateThreads(): boolean;
    /** Whether the guild is able to set role icons */
    get roleIcons(): boolean;
    /** Checks whether or not the permissions exist in this */
    has(permissions: GuildToggleKeys | GuildToggleKeys[]): boolean;
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list(): Record<"verified" | "banner" | "owner" | "unavailable" | "large" | "widgetEnabled" | "premiumProgressBarEnabled" | "inviteSplash" | "vipRegions" | "vanityUrl" | "partnered" | "community" | "commerce" | "news" | "discoverable" | "discoverableDisabled" | "feature" | "animatedIcon" | "welcomeScreenEnabled" | "memberVerificationGateEnabled" | "previewEnabled" | "ticketedEventsEnabled" | "monetizationEnabled" | "moreStickers" | "privateThreads" | "roleIcons", boolean>;
}
export declare type GuildToggleKeys = keyof typeof GuildToggle;
