"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiToggles = exports.EmojiToggle = void 0;
const ToggleBitfield_js_1 = require("./ToggleBitfield.js");
exports.EmojiToggle = {
    /** Whether this emoji must be wrapped in colons */
    requireColons: 1 << 0,
    /** Whether this emoji is managed */
    managed: 1 << 1,
    /** Whether this emoji is animated */
    animated: 1 << 2,
    /** Whether this emoji can be used, may be false due to loss of Server Boosts */
    available: 1 << 3,
};
class EmojiToggles extends ToggleBitfield_js_1.ToggleBitfield {
    constructor(role) {
        super();
        if (role.require_colons)
            this.add(exports.EmojiToggle.requireColons);
        if (role.managed)
            this.add(exports.EmojiToggle.managed);
        if (role.animated)
            this.add(exports.EmojiToggle.animated);
        if (role.available)
            this.add(exports.EmojiToggle.available);
    }
    /** Whether this emoji must be wrapped in colons */
    get requireColons() {
        return this.has("requireColons");
    }
    /** Whether this emoji is managed */
    get managed() {
        return this.has("managed");
    }
    /** Whether this emoji is animated */
    get animated() {
        return this.has("animated");
    }
    /** Whether this emoji can be used, may be false due to loss of Server Boosts */
    get available() {
        return this.has("available");
    }
    /** Checks whether or not the permissions exist in this */
    has(permissions) {
        if (!Array.isArray(permissions))
            return super.contains(exports.EmojiToggle[permissions]);
        return super.contains(permissions.reduce((a, b) => (a |= exports.EmojiToggle[b]), 0));
    }
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list() {
        const json = {};
        for (const [key, value] of Object.entries(exports.EmojiToggle)) {
            json[key] = super.contains(value);
        }
        return json;
    }
}
exports.EmojiToggles = EmojiToggles;
