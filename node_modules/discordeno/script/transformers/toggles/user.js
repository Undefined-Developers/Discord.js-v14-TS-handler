"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToggles = exports.UserToggle = void 0;
const ToggleBitfield_js_1 = require("./ToggleBitfield.js");
exports.UserToggle = {
    /** Whether the user belongs to an OAuth2 application */
    bot: 1 << 0,
    /** Whether the user is an Official Discord System user (part of the urgent message system) */
    system: 1 << 1,
    /** Whether the user has two factor enabled on their account */
    mfaEnabled: 1 << 2,
    /** Whether the email on this account has been verified */
    verified: 1 << 3,
};
class UserToggles extends ToggleBitfield_js_1.ToggleBitfield {
    constructor(user) {
        super();
        if (user.bot)
            this.add(exports.UserToggle.bot);
        if (user.system)
            this.add(exports.UserToggle.system);
        if (user.mfa_enabled)
            this.add(exports.UserToggle.mfaEnabled);
        if (user.verified)
            this.add(exports.UserToggle.verified);
    }
    /** Whether the user belongs to an OAuth2 application */
    get bot() {
        return this.has("bot");
    }
    /** Whether the user is an Official Discord System user (part of the urgent message system) */
    get system() {
        return this.has("system");
    }
    /** Whether the user has two factor enabled on their account */
    get mfaEnabled() {
        return this.has("mfaEnabled");
    }
    /** Whether the email on this account has been verified */
    get verified() {
        return this.has("verified");
    }
    /** Checks whether or not the permissions exist in this */
    has(permissions) {
        if (!Array.isArray(permissions))
            return super.contains(exports.UserToggle[permissions]);
        return super.contains(permissions.reduce((a, b) => (a |= exports.UserToggle[b]), 0));
    }
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list() {
        const json = {};
        for (const [key, value] of Object.entries(exports.UserToggle)) {
            json[key] = super.contains(value);
        }
        return json;
    }
}
exports.UserToggles = UserToggles;
