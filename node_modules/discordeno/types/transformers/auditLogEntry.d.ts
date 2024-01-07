import { Bot } from "../bot.js";
import { DiscordAuditLogEntry } from "../types/discord.js";
export declare function transformAuditLogEntry(bot: Bot, payload: DiscordAuditLogEntry): {
    reason?: string | undefined;
    options?: {
        id?: bigint | undefined;
        channelId?: bigint | undefined;
        messageId?: bigint | undefined;
        type: number;
        count: number;
        deleteMemberDays: number;
        membersRemoved: number;
        roleName: string;
    } | undefined;
    changes?: {
        new?: string | number | bigint | boolean | {
            allow?: string | undefined;
            deny?: string | undefined;
            type: import("../types/shared.js").OverwriteTypes;
            id: string;
        }[] | {
            id?: bigint | undefined;
            name?: string | undefined;
        }[] | undefined;
        old?: string | number | bigint | boolean | {
            allow?: string | undefined;
            deny?: string | undefined;
            type: import("../types/shared.js").OverwriteTypes;
            id: string;
        }[] | {
            id?: bigint | undefined;
            name?: string | undefined;
        }[] | undefined;
        key: "description" | "type" | "code" | "location" | "id" | "name" | "color" | "position" | "temporary" | "mute" | "status" | "region" | "channel_id" | "deaf" | "topic" | "bitrate" | "user_limit" | "rate_limit_per_user" | "default_auto_archive_duration" | "permission_overwrites" | "nsfw" | "owner_id" | "application_id" | "permissions" | "nick" | "communication_disabled_until" | "discovery_splash_hash" | "banner_hash" | "preferred_locale" | "rules_channel_id" | "public_updates_channel_id" | "icon_hash" | "image_hash" | "splash_hash" | "afk_channel_id" | "vanity_url_code" | "widget_channel_id" | "system_channel_id" | "allow" | "deny" | "inviter_id" | "avatar_hash" | "command_id" | "afk_timeout" | "mfa_level" | "verification_level" | "explicit_content_filter" | "default_message_notifications" | "prune_delete_days" | "max_uses" | "uses" | "max_age" | "expire_behavior" | "expire_grace_period" | "privacy_level" | "auto_archive_duration" | "entity_type" | "$add" | "$remove" | "widget_enabled" | "hoist" | "mentionable" | "enable_emoticons" | "archived" | "locked" | "invitable";
    }[] | undefined;
    userId?: bigint | undefined;
    targetId?: bigint | undefined;
    id: bigint;
    actionType: import("../types/shared.js").AuditLogEvents;
};
export interface AuditLogEntry extends ReturnType<typeof transformAuditLogEntry> {
}
