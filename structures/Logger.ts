import chalk from 'chalk';
import { getInfo } from 'discord-hybrid-sharding';
import { EmbedBuilder, WebhookClient } from 'discord.js';
import moment from 'moment';

import { config } from '../config/config';

const strings = {
  Info:    "  Info ",
  Warn:    "  Warn ",
  Log:     "   Log ",
  Error:   " Error ",
  Success: "Success",
  Debug:   " Debug "
}

const default_options = {
  prefix: "Erry",
  debug: true,
  info: true,
  error: true,
  success: true,
  warn: true,
  log: true,
  webhook: {
    link: config.logLevel.webhook,
    debug: true,
    info: true,
    error: true,
    success: true,
    warn: true,
    log: true,
    serverlog: true
  }
}

export interface loggerOptions {
  prefix: string,
  debug: boolean,
  info: boolean,
  error: boolean,
  success: boolean,
  warn: boolean,
  log: boolean,
  logLevel: number,
  webhook: webhookOptions
}

export type webhookOptions = {
  link: string,
  debug: boolean,
  info: boolean,
  error: boolean,
  success: boolean,
  warn: boolean,
  log: boolean,
  serverlog: boolean
}

interface inputOption {
  prefix: string,
  debug?: boolean,
  info?: boolean,
  error?: boolean,
  success?: boolean,
  warn?: boolean,
  log?: boolean,
  logLevel?: number,
  webhook?: {
    link?: string,
    debug?: boolean,
    info?: boolean,
    error?: boolean,
    success?: boolean,
    warn?: boolean,
    log?: boolean,
    serverlog?: boolean
  }
}

export class Logger {
  space: string
  options: loggerOptions
  webhook: WebhookClient | undefined
  constructor(options?: inputOption) {
    this.space = chalk.magenta.bold(" [::] ")
    this.options = { ...default_options, ...options } as unknown as loggerOptions
    if (this.options.webhook.link) this.webhook = new WebhookClient({ url: this.options.webhook.link });
    else for (const key of Object.keys(this.options.webhook) as (keyof webhookOptions)[]) {if (key == "link") continue; this.options.webhook[key] = false}
  }
  GetDay() {
    return moment().format("DD/MM/YY")
  }
  GetTime() {
    return moment().format("HH:mm:ss.SS")
  }

  info(...input: string[]): void {
    if (!this.options.info) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.cyan.bold(strings.Info),
        chalk.cyan.bold(">: "),
        chalk.cyan.dim(input.flat().join(" "))
      ].join("")
    )
    if (!this.options.webhook.info) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("INFO")
        .setDescription(input.flat().join(" "))
        .setColor("Aqua")
      ],
      username: `Info from cluster #${getInfo().CLUSTER}`
    })
    return;
  }

  warn(...input: string[]): void {
    if (!this.options.warn) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.yellow.bold(strings.Warn),
        chalk.yellow.bold(">: "),
        chalk.yellow.dim(input.flat().join(" "))
      ].join("")
    )
    if (!this.options.webhook.warn) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("WARNING")
        .setDescription(input.flat().join(" "))
        .setColor("Gold")
      ],
      username: `Warn from cluster #${getInfo().CLUSTER}`
    })
    return;
  }

  error(error: Error): void {
    if (!this.options.error) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.red.bold(strings.Error),
        chalk.red.bold(">: "),
        chalk.red.dim(
          (typeof error == "string" ? [error] : error.stack ? [error.stack] : [error.name, error.message])
            .filter(Boolean)
            .map(v => v.toString())
            .join("\n")
        )
      ].join("")
    )
    if (!this.options.webhook.error) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("ERROR")
        .setDescription((typeof error == "string" ? [error] : error.stack ? [error.stack] : [error.name, error.message])
        .filter(Boolean)
        .map(v => v.toString())
        .join("\n")
        .substring(0, 2000))
        .setColor("Red")
      ],
      username: `Error on cluster #${getInfo().CLUSTER}`
    })
    return;
  }

  stringError(...error: string[]): void {
    if (!this.options.error) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.red.bold(strings.Error),
        chalk.red.bold(">: "),
        chalk.red.dim(error.flat().join(" "))
      ].join("")
    )
    if (!this.options.webhook.error) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("ERROR")
        .setDescription(error.flat().join(" ").substring(0, 2000))
        .setColor("Red")
      ],
      username: `Error on cluster #${getInfo().CLUSTER}`
    })
    return;
  }

  success(...input: string[]): void {
    if (!this.options.success) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.green.bold(strings.Success),
        chalk.green.bold(">: "),
        chalk.green.dim(input.flat().join(" "))
      ].join("")
    )
    if (!this.options.webhook.success) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("SUCCESS")
        .setDescription(input.flat().join(" "))
        .setColor("Green")
      ],
      username: `Success on cluster #${getInfo().CLUSTER}`
    })
    return;
  }

  debug(...input: string[]): void {
    if (!this.options.debug) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.gray.bold(strings.Debug),
        chalk.gray.bold(">: "),
        chalk.gray.dim(input.flat().join(" "))
      ].join("")
    )
    if (!this.options.webhook.debug) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("DEBUG")
        .setDescription(input.flat().join(" "))
        .setColor("Greyple")
      ],
      username: `Debug from cluster #${getInfo().CLUSTER}`
    })
    return;
  }

  log(...input: string[]): void {
    if (!this.options.log) return;
    console.log(
      [
        chalk.gray(this.GetDay()) + " ",
        chalk.gray.bold(this.GetTime()) + " ",
        this.options.prefix ? chalk.yellow.bold(this.options.prefix) : "",
        this.space,
        chalk.gray.bold(strings.Log),
        chalk.gray.bold(">: "),
        chalk.gray.dim(input.flat().join(" "))
      ].join("")
    )
    if (!this.options.webhook.log && this.options.webhook.link) return;
    this.webhook?.send({
      embeds: [
        new EmbedBuilder()
        .setTitle("LOG")
        .setDescription(input.flat().join(" "))
        .setColor("Aqua")
      ],
      username: `Log from cluster #${getInfo().CLUSTER}`
    })
    return;
  }
}
