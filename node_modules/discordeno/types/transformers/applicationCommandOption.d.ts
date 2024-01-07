import { Bot } from "../bot.js";
import { DiscordApplicationCommandOption } from "../types/discord.js";
import { ApplicationCommandOptionTypes, ChannelTypes, Localization } from "../types/shared.js";
import { ApplicationCommandOptionChoice } from "./applicationCommandOptionChoice.js";
export declare function transformApplicationCommandOption(bot: Bot, payload: DiscordApplicationCommandOption): ApplicationCommandOption;
export interface ApplicationCommandOption {
    /** Value of Application Command Option Type */
    type: ApplicationCommandOptionTypes;
    /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
    name: string;
    /** Localization object for the `name` field. Values follow the same restrictions as `name` */
    nameLocalizations?: Localization;
    /** 1-100 character description */
    description: string;
    /** Localization object for the `description` field. Values follow the same restrictions as `description` */
    descriptionLocalizations?: Localization;
    /** If the parameter is required or optional--default `false` */
    required?: boolean;
    /** Choices for `string` and `int` types for the user to pick from */
    choices?: ApplicationCommandOptionChoice[];
    /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
    options?: ApplicationCommandOption[];
    /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
    autocomplete?: boolean;
    /** If the option is a channel type, the channels shown will be restricted to these types */
    channelTypes?: ChannelTypes[];
    /** Minimum number desired. */
    minValue?: number;
    /** Maximum number desired. */
    maxValue?: number;
    /** Minimum length desired. */
    minLength?: number;
    /** Maximum length desired. */
    maxLength?: number;
}
