"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformWidgetSettings = void 0;
function transformWidgetSettings(bot, payload) {
    const widget = {
        enabled: payload.enabled,
        channelId: payload.channel_id ?? undefined,
    };
    return widget;
}
exports.transformWidgetSettings = transformWidgetSettings;
