import { LocaleString } from 'discord.js';
import { promises } from 'fs';
import { readdir } from 'fs/promises';

import { Config, config } from '../config/config.js';
import { Emojis, emojis } from '../config/emoji.js';
import { commandLocalizations } from '../utils/otherTypes.js';
import { Logger } from './Logger.js';

export class ErryLanguage {
  public config: Config
  public emoji: Emojis
  public logger: Logger

  constructor() {
    this.config = config
    this.emoji = emojis
    this.logger = new Logger({prefix: "Erry Language", ...this.config.logLevel})
  }

  public translate(key: string, language: LocaleString, additional?: {
    [key: string]: string
  }, replace?: boolean): string {
    try {
      var str
      try {
        str = this.get[language] as NestedLanguageType
        for (var keyy of key.split(".")) {
          str = str[keyy] as NestedLanguageType
        }
      } catch (e) {
        str = this.get[this.config.defaultLanguage] as NestedLanguageType
        for (var keyy of key.split(".")) {
          str = str[keyy] as NestedLanguageType
        }
      }
      if (typeof str == "object") {
        var keys = Object.keys(str)
        for (const key of keys) {
          if (typeof str[key] != "string") continue;
          if (additional) {
            for (var placeholder in additional) {
              str[key] = (str[key] as string).replaceAll(`{{${placeholder}}}`, !!!replace ? additional[placeholder] : "")
            }
          }
          for (var placeholder in this.emoji) {
            str[key] = (str[key] as string).replaceAll(`{{Emoji_${placeholder}}}`, !!!replace ? this.emoji[placeholder] : "")
          }
          str[key] = (str[key] as string).replaceAll(/\s*\{{.*?\}}\s*/g, "")
        }
      } else {
        if (additional) {
          for (var placeholder in additional) {
            str = (str as string).replaceAll(`{{${placeholder}}}`, !!!replace ? additional[placeholder] : "")
          }
        }
        for (var placeholder in this.emoji) {
          str = (str as string).replaceAll(`{{Emoji_${placeholder}}}`, !!!replace ? this.emoji[placeholder] : "")
        }
        str = (str as string).replaceAll(/\s*\{{.*?\}}\s*/g, "")
      }
      return (str ? str : "") as string
    } catch (e) {
      console.error(e)
      this.logger.stringError(`Error in key "${key}", language: "${language}"`)
      return ""
    }
  };

  public get get() {
    return languages
  }

  public async init(path = "/languages/") {
    const dirs = await readdir(`${process.cwd()}${path}`)
    for (const dir of dirs) {
      const curPath = `${process.cwd()}${path}/${dir}`;
      const language = JSON.parse((await promises.readFile(curPath)).toString());
      languages[dir.split(".json")[0]] = language
      this.logger.debug(`✅ Language Loaded: ${dir.split(".json")[0]}`)
    }
  }

  public translatePermissions(permissionsArray: string[], ls: LocaleString) {
    if (!permissionsArray || permissionsArray.length <= 0) return this.translate("common.error", ls);
    var result = permissionsArray.map((permission, index) => {
      return this.translate(`common.permissions.${permission}`, ls)
    })
    return result;
  }

  public getSlashCommandName(path: string): string {
    this.logger.debug(`getSlashCommandName was just called with path: ${path}`);
    const keys = path.split('.');
    let current: NestedLanguageType | string = (languages[config.defaultLanguage] as NestedLanguageType)?.commands;

    if (typeof current === 'undefined') {
      throw `You provided wrong default language in config ${config.defaultLanguage}`
    }

    for (const key of keys) {
      if (typeof current === 'string' || !(key in current)) {
        throw `You provided wrong command localizations path (${path}), or this path is not found in default language in config (${config.defaultLanguage})`
      }
      current = current[key];
    }

    if (!(current as NestedLanguageType).slashLocalizations || !((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name)
      throw `No name found in path (${path}), or this path is not found in default language in config ${config.defaultLanguage}`

    return ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name ?? "undefined";
  }

  public getSlashCommandDescription(path: string): string {
    this.logger.debug(`getSlashCommandDescription was just called with path: ${path}`);
    const keys = path.split('.');
    let current: NestedLanguageType | string = (languages[config.defaultLanguage] as NestedLanguageType)?.commands;

    if (typeof current === 'undefined') {
      throw `You provided wrong default language in config ${config.defaultLanguage}`
    }

    for (const key of keys) {
      if (typeof current === 'string' || !(key in current)) {
        throw `You provided wrong command localizations path (${path}), or this path is not found in default language in config (${config.defaultLanguage})`
      }
      current = current[key];
    }

    if (!(current as NestedLanguageType).slashLocalizations || !((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name)
      throw `No name found in path (${path}), or this path is not found in default language in config ${config.defaultLanguage}`

    return ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.description ?? "Description not provided";
  }

  public getSlashCommandLocalizations(path: string): commandLocalizations[] {
    this.logger.debug(`getSlashCommandLocalizations was just called with path: ${path}`);
    const keys = path.split('.');
    let results: commandLocalizations[] = [];

    // Get the default language data once to use in fallback cases
    const defaultLanguage = config.defaultLanguage;
    const defaultLocalization = (languages[defaultLanguage] as NestedLanguageType)?.commands;

    for (const language of Object.keys(languages)) {
      let current: NestedLanguageType | string = (languages[language] as NestedLanguageType)?.commands;

      // Navigate through the keys in the path, even if current is undefined
      for (const key of keys) {
        if (typeof current === 'string' || !(key in current)) {
          current = "undefined";
          break;
        }
        current = current[key];
      }

      let commandName = `cmd-${keys[keys.length - 1]}-${language}`; // Shortened to last part of the path + language
      let commandDescription = "No Description Provided"; // Default description if no specific description is found

      if (current) {
        // Get the specific command data if exists
        const commandData = (current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations;
        commandName = commandData?.name ?? `cmd-${keys[keys.length - 1]}-${language}`;
        commandDescription = commandData?.description ?? "No Description Provided";
      } else if (language !== defaultLanguage) {
        // If not found, fallback to default language
        let fallback = defaultLocalization;

        // Navigate through the keys for the fallback language
        for (const key of keys) {
          if (typeof fallback === 'string' || !(key in fallback)) {
            fallback = "undefined";
            break;
          }
          fallback = fallback[key];
        }

        if (fallback) {
          const fallbackCommand = (fallback as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations;
          commandName = fallbackCommand?.name ?? `cmd-${keys[keys.length - 1]}-${language}`;
          commandDescription = fallbackCommand?.description ?? "No Description Provided";
        }
      }

      // Ensure the command name length is within limits
      commandName = commandName.slice(0, 100); // Trim to 100 characters

      // Push the result for this language
      results.push({
        language: language as LocaleString,
        name: commandName,
        description: commandDescription,
      });
    }

    return results;
  }

  public getSlashCommandOptionName(path: string, number: number): string {
    this.logger.debug(`getSlashCommandOptionName was just called with path: ${path} and number: ${number}`);
    const keys = path.split('.');
    let current: NestedLanguageType | string = (languages[config.defaultLanguage] as NestedLanguageType)?.commands;

    if (typeof current === 'undefined') {
      throw `You provided wrong default language in config ${config.defaultLanguage}`
    }

    for (const key of keys) {
      if (typeof current === 'string' || !(key in current)) {
        throw `You provided wrong command localizations path (${path}), or this path is not found in default language in config (${config.defaultLanguage})`
      }
      current = current[key];
    }

    if (!(current as NestedLanguageType).slashLocalizations || !(((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.options[`${number}`] as LanguageOptionLocalization).name)
      throw `No name found in path (${path}), or this path is not found in default language in config ${config.defaultLanguage}`

    return (((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.options[`${number}`] as LanguageOptionLocalization).name ?? "undefined";
  }

  public getSlashCommandOptionDescription(path: string, number: number): string {
    this.logger.debug(`getSlashCommandOptionDescription was just called with path: ${path} and number: ${number}`);
    const keys = path.split('.');
    let current: NestedLanguageType | string = (languages[config.defaultLanguage] as NestedLanguageType)?.commands;

    if (typeof current === 'undefined') {
      throw `You provided wrong default language in config ${config.defaultLanguage}`
    }

    for (const key of keys) {
      if (typeof current === 'string' || !(key in current)) {
        throw `You provided wrong command localizations path (${path}), or this path is not found in default language in config (${config.defaultLanguage})`
      }
      current = current[key];
    }

    if (!(current as NestedLanguageType).slashLocalizations || !(((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.options[`${number}`] as LanguageOptionLocalization).name)
      throw `No description found in path (${path}), or this path is not found in default language in config ${config.defaultLanguage}`

    return (((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.options[`${number}`] as LanguageOptionLocalization).description ?? "undefined";
  }

  public getSlashCommandOptionLocalizations(path: string, number: number): commandLocalizations[] {
    const keys = path.split('.');
    let results: commandLocalizations[] = [];

    // Get the default language data once to use in fallback cases
    const defaultLanguage = config.defaultLanguage;
    const defaultLocalization = (languages[defaultLanguage] as NestedLanguageType)?.commands;

    // Iterate over the available languages
    for (const language of Object.keys(languages)) {
      let current: NestedLanguageType | string = (languages[language] as NestedLanguageType)?.commands;

      // Navigate through the keys in the path, even if current is undefined
      for (const key of keys) {
        if (typeof current === 'string' || !(key in current)) {
          current = 'undefined';
          break;
        }
        current = current[key];
      }

      // Get the specific option for this language
      const option = ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.options?.[`${number}`] as undefined | LanguageOptionLocalization;

      if (!option && language !== defaultLanguage) {
        let fallback = defaultLocalization;

        // Navigate through the keys for the fallback language
        for (const key of keys) {
          if (typeof fallback === 'string' || !(key in fallback)) {
            fallback = 'undefined';
            break;
          }
          fallback = fallback[key];
        }

        // Fetch the fallback option
        const fallbackOption = ((fallback as NestedLanguageType)?.slashLocalizations as LanguageCommandLocalizations)?.options?.[`${number}`] as undefined | LanguageOptionLocalization;

        // Use fallback with more deterministic naming
        results.push({
          language: language as LocaleString,
          name: fallbackOption?.name ? `${fallbackOption.name}-${language}-${number}` : `option-${number}-${language}`,
          description: fallbackOption?.description || 'No Description Provided',
        });
      } else {
        // If the option exists, push it as is
        results.push({
          language: language as LocaleString,
          name: option?.name || `option-${number}-${language}`,
          description: option?.description || 'No Description Provided',
        });
      }
    }

    return results;
  }

}

export const languages: NestedLanguageType = {}

export type NestedLanguageType = {
  [key: string]: string | NestedLanguageType;
};

type LanguageCommandLocalizations = {
  name: string;
  description: string;
  options: LanguageOptionsLocalizations
  [key: string]: string | NestedLanguageType;
}
type LanguageOptionsLocalizations = {
  [key: string]: string | LanguageOptionLocalization;
}
type LanguageOptionLocalization = {
  name: string
  description: string
  [key: string]: string | NestedLanguageType;
}