import { Shard } from 'discord-cross-hosting';
import { ClusterClient, DjsDiscordClient, getInfo } from 'discord-hybrid-sharding';
import {
    ActivityType, ApplicationCommand, ApplicationCommandType, Client, ClientOptions, Collection,
    ContextMenuCommandBuilder, GatewayIntentBits, GuildResolvable, Partials, PresenceStatusData,
    PresenceUpdateStatus, RESTPostAPIChatInputApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody, ShardClientUtil, SlashCommandBuilder,
    SlashCommandSubcommandBuilder
} from 'discord.js';
import { promises } from 'fs';
import { resolve } from 'path';
import { createClient, RedisClientType } from 'redis';
import { pathToFileURL } from 'url';

import { PrismaClient } from '@prisma/client';

import { Config, getConfig } from '../config/config';
import { Emojis, getEmojis } from '../config/emoji';
import { dirSetup } from '../config/SlashCommandDirSetup';
import {
    BotCounters, Command, commandOptionChoiceNumber, commandOptionChoiceString, ContextCommand,
    optionTypes
} from '../utils/otherTypes';
import { ErryFunctions } from './Functions';
import { ErryLanguage } from './Language';
import { Logger } from './Logger';

export class BotClient extends Client {
    config: Config
    logger: Logger
    cluster: ClusterClient<DjsDiscordClient>
    commands: Collection<string, Command|ContextCommand>
    eventPaths: Collection<string, {eventName: string, path: string}>
    cooldowns: { user: Collection<string, Collection<string, number>>; guild: Collection<string, Collection<string, number>>; global: Collection<string, number[]>; autocomplete: Collection<string, Collection<string, number>>; };
    cache: RedisClientType
    functions: ErryFunctions
    db: PrismaClient
    allCommands: (RESTPostAPIContextMenuApplicationCommandsJSONBody | RESTPostAPIChatInputApplicationCommandsJSONBody)[]
    fetchedApplication: ApplicationCommand<{guild: GuildResolvable;}>[]
    machine: Shard
    lang: ErryLanguage
    emoji: Emojis
    constructor(options?: ClientOptions) {
        super({
            ...getDefaultClientOptions(),
            ...options
        });
        this.config = getConfig()
        this.cluster = new ClusterClient(this);
        this.machine = new Shard(this.cluster);
        this.logger = new Logger({ prefix: "     Erry    ", ...this.config.logLevel });
        this.commands = new Collection();
        this.eventPaths = new Collection();
        this.cooldowns = {
          user: new Collection(),
          guild: new Collection(),
          global: new Collection(),
          autocomplete: new Collection()
        };
        this.allCommands = [];
        this.fetchedApplication = [],
        this.functions = new ErryFunctions(this);
        this.db = new PrismaClient()
        this.cache = createClient({url: this.config.redis})
        this.lang = new ErryLanguage()
        this.emoji = getEmojis()
        this.init();
    }
    async init() {
        console.log(`${"-=".repeat(40)}-`);
        this.logger.info(`Loading Languages`);
        await this.lang.init();

        console.log(`${"-=".repeat(40)}-`);
        this.logger.info(`Loading Cache`);
        await this.cache.connect().then(e => {this.logger.debug("✅ Cache ready")});

        console.log(`${"-=".repeat(40)}-`);
        this.logger.info(`Loading Events`);
        await this.loadEvents();

        console.log(`${"-=".repeat(40)}-`);
        this.logger.info(`Loading Commands`);
        await this.loadCommands();

        console.log(`${"-=".repeat(40)}-`);
        this.logger.info(`Loading ContextMenu`);
        await this.loadContextMenu();

        console.log(`${"-=".repeat(40)}-`);
        this.logger.info(`Loading Extenders`);
        await this.loadExtenders();

        return this.emit("ErryLoaded", this);
    }
    get counters() {
      return {
        guilds: this.guilds.cache.size,
        members: this.guilds.cache.map(x => x.memberCount).reduce((a,b) => a+b,0),
        clusterId: this.cluster.id,
        shardIds: [...this.cluster.ids.keys()],
        ping: this.ws.ping,
        uptime: this.uptime,
      } as BotCounters
    }
    async loadExtenders() {
      try {
        const paths = await walks(`${process.cwd()}/extenders`);
        await Promise.all(
            paths.map(async (path) => {
                const extender = await import(globalFilePath(resolve(path))).then(x => x.default)
                const name = resolve(path).includes("\\") ? resolve(path).split("\\").reverse()[0] : resolve(path).split("/").reverse()[0];
                this.logger.debug(`✅ Extender Loaded: ${name.replace(".ts", "")}`);
                return extender(this);
            })
        );
      } catch (e) {
        this.logger.error(e as Error);
      }
      return true;
    }
    async loadEvents() {
      try {
        this.eventPaths.clear();
        const paths = await walks(`${process.cwd()}/events`);
        if (paths.length == 0) return;
        await Promise.all(
            paths.map(async (path) => {
                const event = await import(globalFilePath(resolve(path))).then(x => x.default)
                const splitted =  resolve(path).includes("\\") ? resolve(path).split("\\") : resolve(path).split("/")
                const eventName = splitted.reverse()[0].replace(".ts", "");
                this.eventPaths.set(eventName, { eventName, path: resolve(path) });
                this.logger.debug(`✅ Event Loaded: ${eventName}`);
                return this.on(eventName, event.bind(null, this));
            })
        );
      } catch (e) {
        this.logger.error(e as Error);
      }
      return true;
    }
    async loadCommands(path="/commands/slash") {
      try {
          this.allCommands = [];
          this.commands.clear();
          const dirs = await promises.readdir(`${process.cwd()}${path}`);
          for(const dir of dirs) {
              if (!dir.endsWith(".ts") && (await promises.lstat(`${process.cwd()}${path}/${dir}/`).catch(() => null))?.isDirectory?.()) {
                  const thisDirSetup = dirSetup.find(x => x.Folder.toLowerCase() === dir.toLowerCase());
                  if (!thisDirSetup) {
                      this.logger.stringError(`Could not find the DirSetup for ${dir}`);
                      continue;
                  }
                  const subSlash = new SlashCommandBuilder().setName(String(thisDirSetup.name).toLowerCase()).setDescription(String(thisDirSetup.description)).setDMPermission(false)
                  
                  if(thisDirSetup.defaultPermissions) {
                      subSlash.setDefaultMemberPermissions(thisDirSetup.defaultPermissions);
                  }
                  if(thisDirSetup.dmPermissions) {
                      subSlash.setDefaultMemberPermissions(thisDirSetup.dmPermissions);
                  }
                  if(thisDirSetup.localizations?.length) {
                      for(const localization of thisDirSetup.localizations) {
                          if(localization.name) subSlash.setNameLocalization(localization.language, localization.name);
                          if(localization.description) subSlash.setDescriptionLocalization(localization.language, localization.description);
                      }
                  }
                  const slashCommands = await promises.readdir(`${process.cwd()}${path}/${dir}/`)
                  for (let file of slashCommands) {
                      const curPath = `${process.cwd()}${path}/${dir}/${file}`;
                      if ((await promises.lstat(curPath).catch(e => this.logger.error(e)))?.isDirectory?.()) {
                          const groupPath = curPath;
                          const groupDirSetup = thisDirSetup.groups?.find(x => x.Folder.toLowerCase() == file.toLowerCase())
                          if (!groupDirSetup) {
                              this.logger.stringError(`Could not find the groupDirSetup for ${dir}/${file}`);
                              continue;
                          }
                          const slashCommands = await promises.readdir(groupPath).then(x => x.filter(v => v.endsWith(".ts")));
                          if (slashCommands?.length) {
                              var commands: {[key: string]: Command} = {}
                              for (let sFile of slashCommands) {
                                  const groupCurPath = `${groupPath}/${sFile}`;
                                  commands[sFile] = await import(globalFilePath(groupCurPath)).then(x => x.default);
                              }
                              subSlash.addSubcommandGroup(Group => {
                                  Group.setName(groupDirSetup.name.toLowerCase()).setDescription(groupDirSetup.description || "Temp_Desc");
                                  if(groupDirSetup.localizations?.length) {
                                      for(const localization of groupDirSetup.localizations) {
                                          if(localization.name) Group.setNameLocalization(localization.language, localization.name);
                                          if(localization.description) Group.setDescriptionLocalization(localization.language, localization.description);
                                      }
                                  }
                                  for (let sFile of slashCommands) {
                                      const groupCurPath = `${groupPath}/${sFile}`;
                                      const command = commands[sFile] as Command;
                                      if (!command.name) {
                                          this.logger.stringError(`${groupCurPath} not containing a Command-Name`);
                                          continue;
                                      }
                                      Group.addSubcommand(Slash => {
                                          Slash.setName(command.name).setDescription(command.description || "Empty Description");
                                          if(command.localizations?.length) {
                                              for(const localization of command.localizations) {
                                                  if(localization.name) Slash.setNameLocalization(localization.name[0], localization.name[1]);
                                                  if(localization.description) Slash.setDescriptionLocalization(localization.description[0], localization.description[1]);
                                              }
                                          }
                                          this.buildOptions(command, Slash)
                                          return Slash;
                                      });
                                      command.commandId = this.fetchedApplication?.find?.((c) => c?.name == subSlash.name)?.permissions?.commandId ?? "commandId";
                                      command.slashCommandKey = `/${subSlash.name} ${Group.name} ${command.name}`
                                      command.mention = `<${command.slashCommandKey}:${command.commandId}>`
                                      this.commands.set("groupcmd_" + String(groupDirSetup.name).toLowerCase() + "_" + String(thisDirSetup.name).toLowerCase() + "_" + command.name, command)
                                      this.logger.debug(`✅ Group Command Loaded: /${thisDirSetup.name} ${groupDirSetup.name} ${command.name}`);
                                  }
                                  return Group;
                              });
                          }
                      }
                      else {
                          const command = await import(globalFilePath(curPath)).then(x => x.default) as Command;
                          if (!command.name) {
                              this.logger.stringError(`${curPath} not containing a Command-Name`);
                              continue;
                          }
                          subSlash.addSubcommand(Slash => {
                              Slash.setName(command.name).setDescription(command.description || "Temp_Desc")
                              if(command.localizations?.length) {
                                  for(const localization of command.localizations) {
                                      if(localization.name) Slash.setNameLocalization(localization.name[0], localization.name[1]);
                                      if(localization.description) Slash.setDescriptionLocalization(localization.description[0], localization.description[1]);
                                  }
                              }
                              this.buildOptions(command, Slash)
                              return Slash;
                          });
                          command.commandId = this?.fetchedApplication?.find?.((c) => c?.name == subSlash.name)?.permissions?.commandId ?? "commandId";
                          command.slashCommandKey = `/${subSlash.name} ${command.name}`
                          command.mention = `<${command.slashCommandKey}:${command.commandId}>`
                          this.commands.set("subcmd_" + String(thisDirSetup.name).toLowerCase() + "_" + command.name, command)
                          this.logger.debug(`✅ ⠀⠀Sub Command Loaded: /${thisDirSetup.name} ${command.name}`);
                      }
                  }
                  this.allCommands.push(subSlash.toJSON());
              }
              else {
                  const curPath = `${process.cwd()}${path}/${dir}`;
                  const command = await import(globalFilePath(curPath)).then(x => x.default) as Command;
                  if (!command.name) {
                      this.logger.stringError(`${curPath} not containing a Command-Name`);
                      continue;
                  }
                  const Slash = new SlashCommandBuilder().setName(command.name).setDescription(command.description || "Temp_Desc").setDMPermission(false);
                  if(command.defaultPermissions) {
                      Slash.setDefaultMemberPermissions(command.defaultPermissions);
                  }
                  if(command.dmPermissions) {
                      Slash.setDefaultMemberPermissions(command.dmPermissions);
                  }
                  if(command.localizations?.length) {
                      for(const localization of command.localizations) {
                          if(localization.name) Slash.setNameLocalization(localization.name[0], localization.name[1]);
                          if(localization.description) Slash.setDescriptionLocalization(localization.description[0], localization.description[1]);
                      }
                  }
                  this.buildOptions(command, Slash);
                  command.commandId = this?.fetchedApplication?.find?.((c) => c?.name == command.name)?.permissions?.commandId ?? "commandId";
                  command.slashCommandKey = `/${command.name}`
                  command.mention = `<${command.slashCommandKey}:${command.commandId}>`
                  this.commands.set("slashcmd_" + command.name, command)
                  this.logger.debug(`✅ Slash Command Loaded: /${command.name}`);
                  this.allCommands.push(Slash.toJSON());
                  continue;
              }
          }
      } catch (e) {
          this.logger.error(e as Error);
      }
      return true;
    }
    async loadContextMenu(path="/commands/context") {
        try {
            const dirs = await promises.readdir(`${process.cwd()}${path}`);
            for(const dir of dirs) {
                const curPath = `${process.cwd()}${path}/${dir}`;
                const command = await import(globalFilePath(curPath)).then(x => x.default) as ContextCommand;
                if (!command.name) {
                    this.logger.stringError(`${curPath} not containing a Command-Name`);
                    continue;
                }
                const Slash = new ContextMenuCommandBuilder()
                    .setName(command.name)
                    .setType(ApplicationCommandType[command.type]);
                if(command.localizations) Slash.setNameLocalizations(command.localizations)
                if(command.defaultPermissions) {
                    Slash.setDefaultMemberPermissions(command.defaultPermissions);
                }
                if(command.dmPermissions) {
                    Slash.setDefaultMemberPermissions(command.dmPermissions);
                }
                command.commandId = this?.fetchedApplication?.find?.((c) => c?.name == command.name)?.permissions?.commandId ?? "commandId";
                command.slashCommandKey = `/${command.name}`
                command.mention = `<${command.slashCommandKey}:${command.commandId}>`
                command.shortName = dir.split(".ts").join("")
                this.commands.set("context_" + command.name, command)
                this.logger.debug(`✅ Context Command Loaded: /${command.name}`);
                this.allCommands.push(Slash.toJSON());
            }
        } catch (e) {
            this.logger.error(e as Error);
        }
        return true;
    }
    async prepareCommands() {
        const allSlashs = await this.application?.commands.fetch(undefined)
            .then(x => [...x.values()])
            .catch(console.warn) 
            || (this.application?.commands.cache.values() ? [...this.application?.commands.cache.values()] : [])
            || [];
        if(allSlashs?.length) {
            this.fetchedApplication = allSlashs;
            for(const [key, value] of [...this.commands.entries()]) {
                if(!value.slashCommandKey) continue;
                const Base = value.slashCommandKey.split(" ")[0].replace("/", "");
                value.commandId = allSlashs.find(c => c.name === Base)?.permissions?.commandId || "0";
                value.mention = value.mention?.replace("commandId", value.commandId);
                this.commands.set(key, value)
            }
            this.logger.debug(`✅ Set Command Mentions of: ${allSlashs?.length} Commands`);
        }
        return true;
    }
    async publishCommands(guildIds?: string[], del?: boolean) {
        if (del) {
          for (var guild of this.guilds.cache.values()) {
            guild.commands.set([]).catch(e => {this.logger.error(e);this.logger.debug(`recent error were for guild ${guild.name} || ${guild.id}`);});
          }
          this.logger.debug(`Deleted all commands!`)
        } 
        if(this.cluster.id !== 0) return;
        if(!guildIds) {
            await this.application?.commands.set(this.allCommands).then(() => {
                this.logger.debug(`SLASH-CMDS | Set ${this.commands.size} slashCommands!`)
            }).catch(e => {this.logger.error(e);});
            return true;
        }
        await this.application?.commands.set(this.allCommands.filter((c) => !this.config.adminCommands?.includes?.(c.name))).then(() => {
            this.logger.debug(`SLASH-CMDS | Set ${this.commands.size} global slashCommands!`)
        }).catch(e => {this.logger.error(e);});
        for (var guildId of guildIds) {
          const shardId = ShardClientUtil.shardIdForGuildId(guildId, getInfo().TOTAL_SHARDS)
          if(![...this.cluster.ids.keys()].includes(shardId)) return this.logger.warn("CANT UPDATE SLASH COMMANDS - WRONG CLUSTER");
          const guild = this.guilds.cache.get(guildId);
          if(!guild) return this.logger.stringError(`could not find the guild \`${guildId}\` for updating slash commands`)
          guild.commands.set(this.allCommands.filter((c) => this.config.adminCommands?.includes?.(c.name))).catch(e => {this.logger.error(e);});
        }
        this.logger.debug(`SLASH-CMDS | Set ${this.commands.size} guild slashCommands!`)
        return true;
    }
    buildOptions(command: Command, Slash: SlashCommandSubcommandBuilder|SlashCommandBuilder) {
        if (command.options?.length) {
            for (const option of command.options) {
                if(option.type.toLowerCase() === optionTypes.attachment) {
                    Slash.addAttachmentOption(op => {
                        op.setName(option.name.toLowerCase())
                        .setDescription(option.description || "TEMP_DESC")
                        .setRequired(!!option.required)
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        return op;
                    })
                }
                if (option.type.toLowerCase() === optionTypes.channel) {
                    Slash.addChannelOption(op => {
                        op.setName(option.name.toLowerCase())
                        .setDescription(option.description || "TEMP_DESC")
                        .setRequired(!!option.required)
                        if (option.channelTypes) op.addChannelTypes(...option.channelTypes)
                        
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        return op;
                    });
                }
                else if (option.type.toLowerCase() === optionTypes.number) {
                    Slash.addNumberOption(op => {
                        op.setName(option.name.toLowerCase())
                            .setDescription(option.description || "TEMP_DESC")
                            .setRequired(!!option.required)
                            .setAutocomplete(!!option.autocomplete)
    
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        if (option.max) op.setMaxValue(option.max)
                        if (option.min) op.setMinValue(option.min)
                        return op;
                    })
                }
                else if (option.type.toLowerCase() === optionTypes.numberchoices) {
                    Slash.addNumberOption(op => {
                        op.setName(option.name.toLowerCase())
                            .setDescription(option.description || "TEMP_DESC")
                            .setRequired(!!option.required)
                            .setAutocomplete(!!option.autocomplete)
    
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        if (option.choices) {
                            const numberChoices = option.choices.filter((choice): choice is commandOptionChoiceNumber => typeof choice.value === 'number');
                            op.setChoices(...numberChoices);
                        }
                        return op;
                    })
                }
                else if (option.type.toLowerCase() === optionTypes.role) {
                    Slash.addRoleOption(op => {
                        op.setName(option.name.toLowerCase())
                            .setDescription(option.description || "TEMP_DESC")
                            .setRequired(!!option.required)
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        return op;
                    });
                }
                else if (option.type.toLowerCase() === optionTypes.string) {
                    Slash.addStringOption(op => {
                        op.setName(option.name.toLowerCase())
                            .setDescription(option.description || "TEMP_DESC")
                            .setRequired(!!option.required)
                            .setAutocomplete(!!option.autocomplete)
    
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        if (option.max) op.setMaxLength(option.max)
                        if (option.min) op.setMinLength(option.min)
                        return op;
                    })
                }
                else if (option.type.toLowerCase() === optionTypes.stringchoices) {
                    Slash.addStringOption(op => {
                        op.setName(option.name.toLowerCase())
                            .setDescription(option.description || "TEMP_DESC")
                            .setRequired(!!option.required)
                            .setAutocomplete(!!option.autocomplete)
    
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        if (option.choices) {
                            const stringChoices = option.choices.filter((choice): choice is commandOptionChoiceString => typeof choice.value === 'string');
                            op.setChoices(...stringChoices);
                        }
                        return op;
                    });
                }
                else if (option.type.toLowerCase() === optionTypes.user) {
                    Slash.addUserOption(op => {
                        op.setName(option.name.toLowerCase())
                            .setDescription(option.description || "TEMP_DESC")
                            .setRequired(!!option.required)
                        if(option.localizations?.length) {
                            for(const localization of option.localizations) {
                                if(localization.name) op.setNameLocalization(localization.name[0], localization.name[1]);
                                if(localization.description) op.setDescriptionLocalization(localization.description[0], localization.description[1]);
                            }
                        }
                        return op;
                    });
                }
            }
        }
        return true;
    }
}

export function getDefaultClientOptions() {
    return {
        shards: getInfo().SHARD_LIST,
        shardCount: getInfo().TOTAL_SHARDS,

        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.GuildMember,
            Partials.ThreadMember,
            Partials.Reaction,
            Partials.User,
            Partials.GuildScheduledEvent,
        ],
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            //GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            //GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            //GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.AutoModerationConfiguration
        ],
        presence: {
            activities: [
                {
                    name: `Booting up`, type: ActivityType.Playing
                }
            ],
            status: PresenceUpdateStatus.DoNotDisturb as PresenceStatusData
        },
        /*sweepers: {   //TODO: Idk how to setup this, so yes
            ...Options.DefaultSweeperSettings,
            bans: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            messages: {
                interval: Second.Minute(5),
                lifetime: Second.Hour(1),
            },
            threads: { 
                interval: Second.Minute(5), 
                lifetime: Second.Hour(1) 
            },
            threadMembers: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            invites: { 
                interval: Second.Minute(5), 
                lifetime: Second.Hour(1) 
            },
            presences: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            reactions: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            stickers: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            autoModerationRules: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            users: { 
                interval: Second.Minute(5), 
                filter: () => user => {
                    return false;
                }
            },
            applicationCommands: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
            emojis: { 
                interval: Second.Minute(5), 
                filter: () => {
                    return false;
                } 
            },
        },*/
        failIfNotExists: false,
        allowedMentions: {
            parse: [],
            users: [],
            roles: [],
            repliedUser: false,
        }
    };
}

export const globalFilePath = (path: string): string => pathToFileURL(path)?.href || path;

async function walks(path: string, recursive: boolean = true): Promise<string[]> {
    let files: string[] = [];
    const items = await promises.readdir(path, { withFileTypes: true });
    for (const item of items) {
        if (item.isDirectory() && recursive) {
            files = [ ...files, ...(await walks(`${path}/${item.name}`)) ];
        } else if(item.isFile()) {
            files.push(`${path}/${item.name}`);
        }
    }
    return files;
};