export function transformWidgetSettings(bot, payload) {
    const widget = {
        enabled: payload.enabled,
        channelId: payload.channel_id ?? undefined,
    };
    return widget;
}
