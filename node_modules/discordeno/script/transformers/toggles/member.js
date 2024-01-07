"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberToggles = exports.MemberToggle = void 0;
const ToggleBitfield_js_1 = require("./ToggleBitfield.js");
exports.MemberToggle = {
    /** Whether the user is deafened in voice channels */
    deaf: 1 << 0,
    /** Whether the user is muted in voice channels */
    mute: 1 << 1,
    /** Whether the user has not yet passed the guild's Membership Screening requirements */
    pending: 1 << 2,
};
class MemberToggles extends ToggleBitfield_js_1.ToggleBitfield {
    constructor(member) {
        super();
        if (member.deaf)
            this.add(exports.MemberToggle.deaf);
        if (member.mute)
            this.add(exports.MemberToggle.mute);
        if (member.pending)
            this.add(exports.MemberToggle.pending);
    }
    /** Whether the user belongs to an OAuth2 application */
    get deaf() {
        return this.has("deaf");
    }
    /** Whether the user is muted in voice channels */
    get mute() {
        return this.has("mute");
    }
    /** Whether the user has not yet passed the guild's Membership Screening requirements */
    get pending() {
        return this.has("pending");
    }
    /** Checks whether or not the permissions exist in this */
    has(permissions) {
        if (!Array.isArray(permissions))
            return super.contains(exports.MemberToggle[permissions]);
        return super.contains(permissions.reduce((a, b) => (a |= exports.MemberToggle[b]), 0));
    }
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list() {
        const json = {};
        for (const [key, value] of Object.entries(exports.MemberToggle)) {
            json[key] = super.contains(value);
        }
        return json;
    }
}
exports.MemberToggles = MemberToggles;
