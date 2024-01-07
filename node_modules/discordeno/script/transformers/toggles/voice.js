"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceStateToggles = exports.VoiceStateToggle = void 0;
const ToggleBitfield_js_1 = require("./ToggleBitfield.js");
exports.VoiceStateToggle = {
    /** Whether this user is deafened by the server */
    deaf: 1 << 0,
    /** Whether this user is muted by the server */
    mute: 1 << 1,
    /** Whether this user is locally deafened */
    selfDeaf: 1 << 2,
    /** Whether this user is locally muted */
    selfMute: 1 << 3,
    /** Whether this user is streaming using "Go Live" */
    selfStream: 1 << 4,
    /** Whether this user's camera is enabled */
    selfVideo: 1 << 5,
    /** Whether this user is muted by the current user */
    suppress: 1 << 6,
};
class VoiceStateToggles extends ToggleBitfield_js_1.ToggleBitfield {
    constructor(voice) {
        super();
        if (voice.deaf)
            this.add(exports.VoiceStateToggle.deaf);
        if (voice.mute)
            this.add(exports.VoiceStateToggle.mute);
        if (voice.self_deaf)
            this.add(exports.VoiceStateToggle.selfDeaf);
        if (voice.self_mute)
            this.add(exports.VoiceStateToggle.selfMute);
        if (voice.self_stream)
            this.add(exports.VoiceStateToggle.selfStream);
        if (voice.self_video)
            this.add(exports.VoiceStateToggle.selfVideo);
        if (voice.suppress)
            this.add(exports.VoiceStateToggle.suppress);
    }
    /** Whether this user is deafened by the server */
    get deaf() {
        return this.has("deaf");
    }
    /** Whether this user is muted by the server */
    get mute() {
        return this.has("mute");
    }
    /** Whether this user is locally deafened */
    get selfDeaf() {
        return this.has("selfDeaf");
    }
    /** Whether this user is locally muted */
    get selfMute() {
        return this.has("selfMute");
    }
    /** Whether this user is streaming using "Go Live" */
    get selfStream() {
        return this.has("selfStream");
    }
    /** Whether this user's camera is enabled */
    get selfVideo() {
        return this.has("selfVideo");
    }
    /** Whether this user is muted by the current user */
    get suppress() {
        return this.has("suppress");
    }
    /** Checks whether or not the permissions exist in this */
    has(permissions) {
        if (!Array.isArray(permissions))
            return super.contains(exports.VoiceStateToggle[permissions]);
        return super.contains(permissions.reduce((a, b) => (a |= exports.VoiceStateToggle[b]), 0));
    }
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list() {
        const json = {};
        for (const [key, value] of Object.entries(exports.VoiceStateToggle)) {
            json[key] = super.contains(value);
        }
        return json;
    }
}
exports.VoiceStateToggles = VoiceStateToggles;
