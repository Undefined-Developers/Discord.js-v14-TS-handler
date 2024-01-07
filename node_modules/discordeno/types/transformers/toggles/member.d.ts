import { DiscordMember } from "../../types/discord.js";
import { ToggleBitfield } from "./ToggleBitfield.js";
export declare const MemberToggle: {
    /** Whether the user is deafened in voice channels */
    deaf: number;
    /** Whether the user is muted in voice channels */
    mute: number;
    /** Whether the user has not yet passed the guild's Membership Screening requirements */
    pending: number;
};
export declare class MemberToggles extends ToggleBitfield {
    constructor(member: Partial<DiscordMember>);
    /** Whether the user belongs to an OAuth2 application */
    get deaf(): boolean;
    /** Whether the user is muted in voice channels */
    get mute(): boolean;
    /** Whether the user has not yet passed the guild's Membership Screening requirements */
    get pending(): boolean;
    /** Checks whether or not the permissions exist in this */
    has(permissions: MemberToggleKeys | MemberToggleKeys[]): boolean;
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list(): Record<"pending" | "mute" | "deaf", boolean>;
}
export declare type MemberToggleKeys = keyof typeof MemberToggle;
