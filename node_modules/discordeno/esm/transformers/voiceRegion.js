export function transformVoiceRegion(bot, payload) {
    const voiceRegion = {
        id: payload.id,
        name: payload.name,
        optimal: payload.optimal,
        deprecated: payload.deprecated,
        custom: payload.custom,
    };
    return voiceRegion;
}
