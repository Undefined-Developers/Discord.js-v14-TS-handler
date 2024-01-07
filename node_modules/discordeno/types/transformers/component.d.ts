import { Bot } from "../bot.js";
import { ButtonStyles, MessageComponentTypes, SelectOption, TextStyles } from "../mod.js";
import { DiscordComponent } from "../types/discord.js";
export declare function transformComponent(bot: Bot, payload: DiscordComponent): Component;
export interface Component {
    /** component type */
    type: MessageComponentTypes;
    /** a developer-defined identifier for the component, max 100 characters */
    customId?: string;
    /** whether the component is disabled, default false */
    disabled?: boolean;
    /** For different styles/colors of the buttons */
    style?: ButtonStyles | TextStyles;
    /** text that appears on the button (max 80 characters) */
    label?: string;
    /** the dev-define value of the option, max 100 characters for select or 4000 for input. */
    value?: string;
    /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
    emoji?: {
        /** Emoji id */
        id?: bigint;
        /** Emoji name */
        name?: string;
        /** Whether this emoji is animated */
        animated?: boolean;
    };
    /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
    url?: string;
    /** The choices! Maximum of 25 items. */
    options?: SelectOption[];
    /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
    placeholder?: string;
    /** The minimum number of items that must be selected. Default 1. Between 1-25. */
    minValues?: number;
    /** The maximum number of items that can be selected. Default 1. Between 1-25. */
    maxValues?: number;
    /** a list of child components */
    components?: Component[];
}
