import { DiscordUser } from "../../types/discord.js";
import { ToggleBitfield } from "./ToggleBitfield.js";
export declare const UserToggle: {
    /** Whether the user belongs to an OAuth2 application */
    bot: number;
    /** Whether the user is an Official Discord System user (part of the urgent message system) */
    system: number;
    /** Whether the user has two factor enabled on their account */
    mfaEnabled: number;
    /** Whether the email on this account has been verified */
    verified: number;
};
export declare class UserToggles extends ToggleBitfield {
    constructor(user: DiscordUser);
    /** Whether the user belongs to an OAuth2 application */
    get bot(): boolean;
    /** Whether the user is an Official Discord System user (part of the urgent message system) */
    get system(): boolean;
    /** Whether the user has two factor enabled on their account */
    get mfaEnabled(): boolean;
    /** Whether the email on this account has been verified */
    get verified(): boolean;
    /** Checks whether or not the permissions exist in this */
    has(permissions: UserToggleKeys | UserToggleKeys[]): boolean;
    /** Lists all the toggles for the role and whether or not each is true or false. */
    list(): Record<"bot" | "system" | "verified" | "mfaEnabled", boolean>;
}
export declare type UserToggleKeys = keyof typeof UserToggle;
