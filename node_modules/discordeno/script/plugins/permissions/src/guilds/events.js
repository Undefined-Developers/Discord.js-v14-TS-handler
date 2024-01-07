"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editScheduledEvent = exports.createScheduledEvent = void 0;
const deps_js_1 = require("../../deps.js");
const permissions_js_1 = require("../permissions.js");
function createScheduledEvent(bot) {
    const createScheduledEventOld = bot.helpers.createScheduledEvent;
    bot.helpers.createScheduledEvent = async function (guildId, options) {
        if (options.entityType === deps_js_1.ScheduledEventEntityType.StageInstance) {
            if (!options.channelId) {
                throw new Error("A channel id is required for creating a stage scheduled event.");
            }
            (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                "MANAGE_CHANNELS",
                "MUTE_MEMBERS",
                "MOVE_MEMBERS",
            ]);
            // MANAGE_EVENTS at the guild level or at least MANAGE_EVENTS for the channel_id associated with the event
            try {
                (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
                    "MANAGE_EVENTS",
                ]);
            }
            catch {
                (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                    "MANAGE_EVENTS",
                ]);
            }
            return createScheduledEventOld(guildId, options);
        }
        if (options.entityType === deps_js_1.ScheduledEventEntityType.Voice) {
            if (!options.channelId) {
                throw new Error("A channel id is required for creating a voice scheduled event.");
            }
            (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                "VIEW_CHANNEL",
                "CONNECT",
            ]);
            // MANAGE_EVENTS at the guild level or at least MANAGE_EVENTS for the channel_id associated with the event
            try {
                (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
                    "MANAGE_EVENTS",
                ]);
            }
            catch {
                (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                    "MANAGE_EVENTS",
                ]);
            }
            return createScheduledEventOld(guildId, options);
        }
        // EXTERNAL EVENTS
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
            "MANAGE_EVENTS",
        ]);
        return await createScheduledEventOld(guildId, options);
    };
}
exports.createScheduledEvent = createScheduledEvent;
function editScheduledEvent(bot) {
    const editScheduledEventOld = bot.helpers.editScheduledEvent;
    bot.helpers.editScheduledEvent = async function (guildId, eventId, options) {
        if (options.entityType === deps_js_1.ScheduledEventEntityType.StageInstance) {
            if (!options.channelId) {
                throw new Error("A channel id is required for creating a stage scheduled event.");
            }
            (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                "MANAGE_CHANNELS",
                "MUTE_MEMBERS",
                "MOVE_MEMBERS",
            ]);
            // MANAGE_EVENTS at the guild level or at least MANAGE_EVENTS for the channel_id associated with the event
            try {
                (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
                    "MANAGE_EVENTS",
                ]);
            }
            catch {
                (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                    "MANAGE_EVENTS",
                ]);
            }
            return editScheduledEventOld(guildId, eventId, options);
        }
        if (options.entityType === deps_js_1.ScheduledEventEntityType.Voice) {
            if (!options.channelId) {
                throw new Error("A channel id is required for creating a voice scheduled event.");
            }
            (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                "VIEW_CHANNEL",
                "CONNECT",
            ]);
            // MANAGE_EVENTS at the guild level or at least MANAGE_EVENTS for the channel_id associated with the event
            try {
                (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
                    "MANAGE_EVENTS",
                ]);
            }
            catch {
                (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                    "MANAGE_EVENTS",
                ]);
            }
            return editScheduledEventOld(guildId, eventId, options);
        }
        // EXTERNAL EVENTS
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
            "MANAGE_EVENTS",
        ]);
        return await editScheduledEventOld(guildId, eventId, options);
    };
}
exports.editScheduledEvent = editScheduledEvent;
function setupEventsPermChecks(bot) {
    createScheduledEvent(bot);
    editScheduledEvent(bot);
}
exports.default = setupEventsPermChecks;
