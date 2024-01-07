import { Bot } from "../bot.js";
import { DiscordTemplate } from "../types/discord.js";
export declare function transformTemplate(bot: Bot, payload: DiscordTemplate): {
    description?: string | null | undefined;
    isDirty?: boolean | undefined;
    code: string;
    name: string;
    createdAt: number;
    creatorId: bigint;
    creator: {
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
    };
    usageCount: number;
    updatedAt: number;
    sourceGuildId: bigint;
    serializedSourceGuild: {
        description?: string | null | undefined;
        id?: string | undefined;
        banner?: string | null | undefined;
        member_count?: number | undefined;
        owner_id?: string | undefined;
        application_id?: string | null | undefined;
        permissions?: string | undefined;
        joined_at?: string | undefined;
        rules_channel_id?: string | null | undefined;
        public_updates_channel_id?: string | null | undefined;
        icon_hash?: string | null | undefined;
        afk_channel_id?: string | null | undefined;
        vanity_url_code?: string | null | undefined;
        widget_channel_id?: string | null | undefined;
        system_channel_id?: string | null | undefined;
        mfa_level?: import("../types/shared.js").MfaLevels | undefined;
        widget_enabled?: boolean | undefined;
        icon?: string | null | undefined;
        owner?: boolean | undefined;
        unavailable?: boolean | undefined;
        features?: import("../types/shared.js").GuildFeatures[] | undefined;
        large?: boolean | undefined;
        max_presences?: number | null | undefined;
        max_members?: number | undefined;
        premium_tier?: import("../types/shared.js").PremiumTiers | undefined;
        premium_subscription_count?: number | undefined;
        max_video_channel_users?: number | undefined;
        approximate_member_count?: number | undefined;
        approximate_presence_count?: number | undefined;
        nsfw_level?: import("../types/shared.js").GuildNsfwLevel | undefined;
        premium_progress_bar_enabled?: boolean | undefined;
        splash?: string | null | undefined;
        discovery_splash?: string | null | undefined;
        emojis?: {
            id?: string | undefined;
            name?: string | undefined;
            user?: {
                avatar?: string | null | undefined;
                locale?: string | undefined;
                flags?: import("../types/shared.js").UserFlags | undefined;
                premium_type?: import("../types/shared.js").PremiumTypes | undefined;
                public_flags?: import("../types/shared.js").UserFlags | undefined;
                accent_color?: number | undefined;
                bot?: boolean | undefined;
                system?: boolean | undefined;
                mfa_enabled?: boolean | undefined;
                verified?: boolean | undefined;
                email?: string | null | undefined;
                banner?: string | undefined;
                id: string;
                discriminator: string;
                username: string;
            } | undefined;
            roles?: string[] | undefined;
            managed?: boolean | undefined;
            animated?: boolean | undefined;
            available?: boolean | undefined;
            require_colons?: boolean | undefined;
        }[] | undefined;
        voice_states?: {
            guild_id?: string | undefined;
            channel_id?: string | null | undefined;
            member?: {
                pending?: boolean | undefined;
                mute?: boolean | undefined;
                avatar?: string | undefined;
                deaf?: boolean | undefined;
                permissions?: string | undefined;
                nick?: string | null | undefined;
                premium_since?: string | null | undefined;
                communication_disabled_until?: string | null | undefined;
                user: import("../types/discord.js").DiscordUser;
                roles: string[];
                joined_at: string;
            } | undefined;
            self_stream?: boolean | undefined;
            request_to_speak_timestamp?: string | null | undefined;
            mute: boolean;
            session_id: string;
            user_id: string;
            deaf: boolean;
            self_deaf: boolean;
            self_mute: boolean;
            self_video: boolean;
            suppress: boolean;
        }[] | undefined;
        members?: {
            pending?: boolean | undefined;
            mute?: boolean | undefined;
            user?: {
                avatar?: string | null | undefined;
                locale?: string | undefined;
                flags?: import("../types/shared.js").UserFlags | undefined;
                premium_type?: import("../types/shared.js").PremiumTypes | undefined;
                public_flags?: import("../types/shared.js").UserFlags | undefined;
                accent_color?: number | undefined;
                bot?: boolean | undefined;
                system?: boolean | undefined;
                mfa_enabled?: boolean | undefined;
                verified?: boolean | undefined;
                email?: string | null | undefined;
                banner?: string | undefined;
                id: string;
                discriminator: string;
                username: string;
            } | undefined;
            avatar?: string | undefined;
            deaf?: boolean | undefined;
            permissions?: string | undefined;
            nick?: string | null | undefined;
            premium_since?: string | null | undefined;
            communication_disabled_until?: string | null | undefined;
            roles: string[];
            joined_at: string;
        }[] | undefined;
        channels?: {
            name?: string | undefined;
            position?: number | undefined;
            flags?: import("../types/shared.js").ChannelFlags | undefined;
            guild_id?: string | undefined;
            member?: {
                id: string;
                flags: number;
                user_id: string;
                join_timestamp: string;
            } | undefined;
            topic?: string | null | undefined;
            bitrate?: number | undefined;
            user_limit?: number | undefined;
            rate_limit_per_user?: number | undefined;
            rtc_region?: string | null | undefined;
            video_quality_mode?: import("../types/shared.js").VideoQualityModes | undefined;
            message_count?: number | undefined;
            member_count?: number | undefined;
            default_auto_archive_duration?: number | undefined;
            permission_overwrites?: {
                allow?: string | undefined;
                deny?: string | undefined;
                type: import("../types/shared.js").OverwriteTypes;
                id: string;
            }[] | undefined;
            nsfw?: boolean | undefined;
            last_message_id?: string | null | undefined;
            owner_id?: string | undefined;
            application_id?: string | undefined;
            parent_id?: string | null | undefined;
            last_pin_timestamp?: string | null | undefined;
            thread_metadata?: {
                invitable?: boolean | undefined;
                create_timestamp?: string | null | undefined;
                auto_archive_duration: 60 | 1440 | 4320 | 10080;
                archived: boolean;
                locked: boolean;
                archive_timestamp: string;
            } | undefined;
            permissions?: string | undefined;
            newly_created?: boolean | undefined;
            type: import("../types/shared.js").ChannelTypes;
            id: string;
        }[] | undefined;
        threads?: {
            name?: string | undefined;
            position?: number | undefined;
            flags?: import("../types/shared.js").ChannelFlags | undefined;
            guild_id?: string | undefined;
            member?: {
                id: string;
                flags: number;
                user_id: string;
                join_timestamp: string;
            } | undefined;
            topic?: string | null | undefined;
            bitrate?: number | undefined;
            user_limit?: number | undefined;
            rate_limit_per_user?: number | undefined;
            rtc_region?: string | null | undefined;
            video_quality_mode?: import("../types/shared.js").VideoQualityModes | undefined;
            message_count?: number | undefined;
            member_count?: number | undefined;
            default_auto_archive_duration?: number | undefined;
            permission_overwrites?: {
                allow?: string | undefined;
                deny?: string | undefined;
                type: import("../types/shared.js").OverwriteTypes;
                id: string;
            }[] | undefined;
            nsfw?: boolean | undefined;
            last_message_id?: string | null | undefined;
            owner_id?: string | undefined;
            application_id?: string | undefined;
            parent_id?: string | null | undefined;
            last_pin_timestamp?: string | null | undefined;
            thread_metadata?: {
                invitable?: boolean | undefined;
                create_timestamp?: string | null | undefined;
                auto_archive_duration: 60 | 1440 | 4320 | 10080;
                archived: boolean;
                locked: boolean;
                archive_timestamp: string;
            } | undefined;
            permissions?: string | undefined;
            newly_created?: boolean | undefined;
            type: import("../types/shared.js").ChannelTypes;
            id: string;
        }[] | undefined;
        presences?: {
            status?: "idle" | "offline" | "online" | "dnd" | undefined;
            user?: {
                avatar?: string | null | undefined;
                locale?: string | undefined;
                flags?: import("../types/shared.js").UserFlags | undefined;
                premium_type?: import("../types/shared.js").PremiumTypes | undefined;
                public_flags?: import("../types/shared.js").UserFlags | undefined;
                accent_color?: number | undefined;
                bot?: boolean | undefined;
                system?: boolean | undefined;
                mfa_enabled?: boolean | undefined;
                verified?: boolean | undefined;
                email?: string | null | undefined;
                banner?: string | undefined;
                id: string;
                discriminator: string;
                username: string;
            } | undefined;
            guild_id?: string | undefined;
            activities?: {
                buttons?: {
                    url: string;
                    label: string;
                }[] | undefined;
                state?: string | null | undefined;
                url?: string | null | undefined;
                details?: string | null | undefined;
                flags?: number | undefined;
                application_id?: string | undefined;
                emoji?: {
                    id?: string | undefined;
                    animated?: boolean | undefined;
                    name: string;
                } | null | undefined;
                instance?: boolean | undefined;
                timestamps?: {
                    end?: number | undefined;
                    start?: number | undefined;
                } | undefined;
                party?: {
                    id?: string | undefined;
                    size?: [currentSize?: number | undefined, maxSize?: number | undefined] | undefined;
                } | undefined;
                assets?: {
                    large_image?: string | undefined;
                    large_text?: string | undefined;
                    small_image?: string | undefined;
                    small_text?: string | undefined;
                } | undefined;
                secrets?: {
                    match?: string | undefined;
                    join?: string | undefined;
                    spectate?: string | undefined;
                } | undefined;
                type: import("../types/shared.js").ActivityTypes;
                name: string;
                created_at: number;
            }[] | undefined;
            client_status?: {
                desktop?: string | undefined;
                mobile?: string | undefined;
                web?: string | undefined;
            } | undefined;
        }[] | undefined;
        welcome_screen?: {
            description?: string | null | undefined;
            welcome_channels: import("../types/discord.js").DiscordWelcomeScreenChannel[];
        } | undefined;
        stage_instances?: {
            guild_scheduled_event_id?: string | undefined;
            id: string;
            guild_id: string;
            channel_id: string;
            topic: string;
        }[] | undefined;
        name: string;
        roles: (Omit<import("../types/shared.js").PickPartial<import("../types/discord.js").DiscordRole, "name" | "color" | "permissions" | "hoist" | "mentionable" | "icon" | "unicode_emoji">, "id"> & {
            id: number;
        })[];
        preferred_locale: string;
        afk_timeout: number;
        verification_level: import("../types/shared.js").VerificationLevels;
        explicit_content_filter: import("../types/shared.js").ExplicitContentFilterLevels;
        default_message_notifications: import("../types/shared.js").DefaultMessageNotificationLevels;
        system_channel_flags: import("../types/shared.js").SystemChannelFlags;
    };
};
export interface Template extends ReturnType<typeof transformTemplate> {
}
