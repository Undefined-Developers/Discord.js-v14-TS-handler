import { DiscordRole } from "../../types/discord.js";
import { ToggleBitfield } from "./ToggleBitfield.js";
export declare const RoleToggle: {
    /** If this role is showed separately in the user listing */
    hoist: number;
    /** Whether this role is managed by an integration */
    managed: number;
    /** Whether this role is mentionable */
    mentionable: number;
    /** Whether this is the guilds premium subscriber role */
    premiumSubscriber: number;
};
export declare class RoleToggles extends ToggleBitfield {
    constructor(role: DiscordRole);
    /** If this role is showed separately in the user listing */
    get hoist(): boolean;
    /** Whether this role is managed by an integration */
    get managed(): boolean;
    /** Whether this role is mentionable */
    get mentionable(): boolean;
    /** Whether this is the guilds premium subscriber role */
    get premiumSubscriber(): boolean;
    /** Checks whether or not the permissions exist in this */
    has(permissions: RoleToggleKeys | RoleToggleKeys[]): boolean;
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list(): Record<"hoist" | "mentionable" | "managed" | "premiumSubscriber", boolean>;
}
export declare type RoleToggleKeys = keyof typeof RoleToggle;
