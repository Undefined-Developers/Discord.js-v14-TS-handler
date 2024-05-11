import { LocaleString } from 'discord.js';
import { readdir } from 'fs/promises';

import { Config, getConfig } from '../config/config.js';
import { Emojis, getEmojis } from '../config/emoji.js';
import { commandLocalizations } from '../utils/otherTypes.js';
import { globalFilePath } from './BotClient.js';
import { Logger } from './Logger.js';

export class ErryLanguage {
  config: Config
  emoji: Emojis
  logger: Logger
  constructor() {
      this.config = getConfig()
      this.emoji = getEmojis()
      this.logger = new Logger({prefix: "Erry Language", ...this.config.logLevel})
  }
  translate(key: string, language: LocaleString, additional?: {[key: string]: string}, replace?: boolean): string {
    try{
      var str
      try {
        str = this.get[language] as NestedLanguageType
        for (var keyy of key.split(".")) {
          str = str[keyy] as NestedLanguageType
        }
      }catch (e) {
        str = this.get[this.config.defaultLanguage] as NestedLanguageType
        for (var keyy of key.split(".")) {
          str = str[keyy] as NestedLanguageType
        }
      }
      if (typeof str == "object") {
        var keys = Object.keys(str)
        for (const key of keys){
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
      }else{
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
    }catch(e) {
      console.error(e)
      this.logger.stringError(`Error in key "${key}", language: "${language}"`)
      return ""
    }
  };
  get get() {
    return languages
  }
  async init(path = "/languages/") {
    const dirs = await readdir(`${process.cwd()}${path}`)
    for(const dir of dirs) {
      const curPath = `${process.cwd()}${path}/${dir}`;
      const language = await import(globalFilePath(curPath)).then(i => i.default);
      languages[dir.split(".json")[0]] = language
      this.logger.debug(`✅ Language Loaded: ${dir.split(".json")[0]}`)
    }
  }
  translatePermissions(permissionsArray: string[], ls: LocaleString) {
    if (!permissionsArray || permissionsArray.length <= 0) return this.translate("common.error", ls);
    var result = permissionsArray.map((permission, index) => {
      return this.translate(`common.permissions.${permission}`, ls)
    })
    return result;
  }
}

export const languages: NestedLanguageType = {}


export function getSlashCommandName(path: string): string {
  const keys = path.split('.');
  let current: NestedLanguageType | string = (languages[getConfig().defaultLanguage] as NestedLanguageType)?.commands;

  if (typeof current === 'undefined') {
    throw `You provided wrong default language in config ${getConfig().defaultLanguage}`
  }

  for (const key of keys) {
    if (typeof current === 'string' || !(key in current)) {
      throw `You provided wrong command localizations path (${path}), or this path is not found in default language in config (${getConfig().defaultLanguage})`
    }
    current = current[key];
  }

  if (!(current as NestedLanguageType).slashLocalizations || !((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name)
    throw `No name found in path (${path}), or this path is not found in default language in config ${getConfig().defaultLanguage}`

  return ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name ?? "undefined";
}

export function getSlashCommandDescription(path: string): string {
  const keys = path.split('.');
  let current: NestedLanguageType | string = (languages[getConfig().defaultLanguage] as NestedLanguageType)?.commands;

  if (typeof current === 'undefined') {
    throw `You provided wrong default language in config ${getConfig().defaultLanguage}`
  }

  for (const key of keys) {
    if (typeof current === 'string' || !(key in current)) {
      throw `You provided wrong command localizations path (${path}), or this path is not found in default language in config (${getConfig().defaultLanguage})`
    }
    current = current[key];
  }

  if (!(current as NestedLanguageType).slashLocalizations || !((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name)
    throw `No name found in path (${path}), or this path is not found in default language in config ${getConfig().defaultLanguage}`

  return ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.description ?? "Description not provided";
}

export function getSlashCommandLocalizations(path: string): commandLocalizations[] {
  const keys = path.split('.');
  let results: commandLocalizations[] = [];

  for (const language of Object.keys(languages)) {
    let current: NestedLanguageType | string = (languages[language] as NestedLanguageType)?.commands;

    if (typeof current === 'undefined') {
      results.push({name: [language as LocaleString, "undefined"], description: [language as LocaleString, "undefined"]});
      continue;
    }

    for (const key of keys) {
      if (typeof current === 'string' || !(key in current)) {
        current = "undefined";
        break;
      }
      current = current[key];
    }

    if (current) {
      results.push({
        name: [language as LocaleString, ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.name ?? "undefined"],
        description: [language as LocaleString, ((current as NestedLanguageType).slashLocalizations as LanguageCommandLocalizations)?.description ?? "No Description Provided"]
      });
    } else {
      results.push({name: [language as LocaleString, "undefined"], description: [language as LocaleString, "undefined"]});
    }
  }

  return results;
}

export type NestedLanguageType = {
  [key: string]: string | NestedLanguageType;
};

type LanguageCommandLocalizations = {
  name: string;
  description: string;
  [key: string]: string | NestedLanguageType;
}