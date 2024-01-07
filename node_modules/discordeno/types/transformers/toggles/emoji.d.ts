import { DiscordEmoji } from "../../types/discord.js";
import { ToggleBitfield } from "./ToggleBitfield.js";
export declare const EmojiToggle: {
    /** Whether this emoji must be wrapped in colons */
    requireColons: number;
    /** Whether this emoji is managed */
    managed: number;
    /** Whether this emoji is animated */
    animated: number;
    /** Whether this emoji can be used, may be false due to loss of Server Boosts */
    available: number;
};
export declare class EmojiToggles extends ToggleBitfield {
    constructor(role: DiscordEmoji);
    /** Whether this emoji must be wrapped in colons */
    get requireColons(): boolean;
    /** Whether this emoji is managed */
    get managed(): boolean;
    /** Whether this emoji is animated */
    get animated(): boolean;
    /** Whether this emoji can be used, may be false due to loss of Server Boosts */
    get available(): boolean;
    /** Checks whether or not the permissions exist in this */
    has(permissions: EmojiToggleKeys | EmojiToggleKeys[]): boolean;
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list(): Record<"managed" | "requireColons" | "animated" | "available", boolean>;
}
export declare type EmojiToggleKeys = keyof typeof EmojiToggle;
