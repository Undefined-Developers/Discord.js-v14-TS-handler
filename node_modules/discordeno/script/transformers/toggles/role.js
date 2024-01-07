"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleToggles = exports.RoleToggle = void 0;
const ToggleBitfield_js_1 = require("./ToggleBitfield.js");
exports.RoleToggle = {
    /** If this role is showed separately in the user listing */
    hoist: 1 << 0,
    /** Whether this role is managed by an integration */
    managed: 1 << 1,
    /** Whether this role is mentionable */
    mentionable: 1 << 2,
    /** Whether this is the guilds premium subscriber role */
    premiumSubscriber: 1 << 3,
};
class RoleToggles extends ToggleBitfield_js_1.ToggleBitfield {
    constructor(role) {
        super();
        if (role.hoist)
            this.add(exports.RoleToggle.hoist);
        if (role.managed)
            this.add(exports.RoleToggle.managed);
        if (role.mentionable)
            this.add(exports.RoleToggle.mentionable);
        if (role.tags?.premium_subscriber === null)
            this.add(exports.RoleToggle.premiumSubscriber);
    }
    /** If this role is showed separately in the user listing */
    get hoist() {
        return this.has("hoist");
    }
    /** Whether this role is managed by an integration */
    get managed() {
        return this.has("managed");
    }
    /** Whether this role is mentionable */
    get mentionable() {
        return this.has("mentionable");
    }
    /** Whether this is the guilds premium subscriber role */
    get premiumSubscriber() {
        return this.has("premiumSubscriber");
    }
    /** Checks whether or not the permissions exist in this */
    has(permissions) {
        if (!Array.isArray(permissions))
            return super.contains(exports.RoleToggle[permissions]);
        return super.contains(permissions.reduce((a, b) => (a |= exports.RoleToggle[b]), 0));
    }
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list() {
        const json = {};
        for (const [key, value] of Object.entries(exports.RoleToggle)) {
            json[key] = super.contains(value);
        }
        return json;
    }
}
exports.RoleToggles = RoleToggles;
