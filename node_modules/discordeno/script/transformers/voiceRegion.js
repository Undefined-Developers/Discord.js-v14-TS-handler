"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformVoiceRegion = void 0;
function transformVoiceRegion(bot, payload) {
    const voiceRegion = {
        id: payload.id,
        name: payload.name,
        optimal: payload.optimal,
        deprecated: payload.deprecated,
        custom: payload.custom,
    };
    return voiceRegion;
}
exports.transformVoiceRegion = transformVoiceRegion;
