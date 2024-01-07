import { BotWithCache, Channel, Guild, Member, OverwriteReadable, PermissionStrings, Role } from "../deps.js";
/** Calculates the permissions this member has in the given guild */
export declare function calculateBasePermissions(bot: BotWithCache, guildOrId: bigint | Guild, memberOrId: bigint | Member): bigint;
/** Calculates the permissions this member has for the given Channel */
export declare function calculateChannelOverwrites(bot: BotWithCache, channelOrId: bigint | Channel, memberOrId: bigint | Member): bigint;
/** Checks if the given permission bits are matching the given permissions. `ADMINISTRATOR` always returns `true` */
export declare function validatePermissions(permissionBits: bigint, permissions: PermissionStrings[]): boolean;
/** Checks if the given member has these permissions in the given guild */
export declare function hasGuildPermissions(bot: BotWithCache, guild: bigint | Guild, member: bigint | Member, permissions: PermissionStrings[]): boolean;
/** Checks if the bot has these permissions in the given guild */
export declare function botHasGuildPermissions(bot: BotWithCache, guild: bigint | Guild, permissions: PermissionStrings[]): boolean;
/** Checks if the given member has these permissions for the given channel */
export declare function hasChannelPermissions(bot: BotWithCache, channel: bigint | Channel, member: bigint | Member, permissions: PermissionStrings[]): boolean;
/** Checks if the bot has these permissions f0r the given channel */
export declare function botHasChannelPermissions(bot: BotWithCache, channel: bigint | Channel, permissions: PermissionStrings[]): boolean;
/** Returns the permissions that are not in the given permissionBits */
export declare function missingPermissions(permissionBits: bigint, permissions: PermissionStrings[]): ("CONNECT" | "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS" | "USE_SLASH_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "MANAGE_THREADS" | "CREATE_PUBLIC_THREADS" | "CREATE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "USE_EMBEDDED_ACTIVITIES" | "MODERATE_MEMBERS")[];
/** Get the missing Guild permissions this member has */
export declare function getMissingGuildPermissions(bot: BotWithCache, guild: bigint | Guild, member: bigint | Member, permissions: PermissionStrings[]): ("CONNECT" | "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS" | "USE_SLASH_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "MANAGE_THREADS" | "CREATE_PUBLIC_THREADS" | "CREATE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "USE_EMBEDDED_ACTIVITIES" | "MODERATE_MEMBERS")[];
/** Get the missing Channel permissions this member has */
export declare function getMissingChannelPermissions(bot: BotWithCache, channel: bigint | Channel, member: bigint | Member, permissions: PermissionStrings[]): ("CONNECT" | "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS" | "USE_SLASH_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "MANAGE_THREADS" | "CREATE_PUBLIC_THREADS" | "CREATE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "USE_EMBEDDED_ACTIVITIES" | "MODERATE_MEMBERS")[];
/** Throws an error if this member has not all of the given permissions */
export declare function requireGuildPermissions(bot: BotWithCache, guild: bigint | Guild, member: bigint | Member, permissions: PermissionStrings[]): void;
/** Throws an error if the bot does not have all permissions */
export declare function requireBotGuildPermissions(bot: BotWithCache, guild: bigint | Guild, permissions: PermissionStrings[]): void;
/** Throws an error if this member has not all of the given permissions */
export declare function requireChannelPermissions(bot: BotWithCache, channel: bigint | Channel, member: bigint | Member, permissions: PermissionStrings[]): void;
/** Throws an error if the bot has not all of the given channel permissions */
export declare function requireBotChannelPermissions(bot: BotWithCache, channel: bigint | Channel, permissions: PermissionStrings[]): void;
/** This function converts a bitwise string to permission strings */
export declare function calculatePermissions(permissionBits: bigint): ("CONNECT" | "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS" | "USE_SLASH_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "MANAGE_THREADS" | "CREATE_PUBLIC_THREADS" | "CREATE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "USE_EMBEDDED_ACTIVITIES" | "MODERATE_MEMBERS")[];
/** This function converts an array of permissions into the bitwise string. */
export declare function calculateBits(permissions: PermissionStrings[]): string;
/** Internal function to check if the bot has the permissions to set these overwrites */
export declare function requireOverwritePermissions(bot: BotWithCache, guildOrId: bigint | Guild, overwrites: OverwriteReadable[]): void;
/** Gets the highest role from the member in this guild */
export declare function highestRole(bot: BotWithCache, guildOrId: bigint | Guild, memberOrId: bigint | Member): Role;
/** Checks if the first role is higher than the second role */
export declare function higherRolePosition(bot: BotWithCache, guildOrId: bigint | Guild, roleId: bigint, otherRoleId: bigint): boolean;
/** Checks if the member has a higher position than the given role */
export declare function isHigherPosition(bot: BotWithCache, guildOrId: bigint | Guild, memberId: bigint, compareRoleId: bigint): boolean;
/** Checks if a channel overwrite for a user id or a role id has permission in this channel */
export declare function channelOverwriteHasPermission(guildId: bigint, id: bigint, overwrites: bigint[], permissions: PermissionStrings[]): boolean;
