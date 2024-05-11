import {
    ActivityType, ChannelType, EmbedAuthorOptions, EmbedBuilder, EmbedFooterOptions, Guild,
    GuildChannel, LocaleString, parseEmoji, PartialEmoji, PermissionsBitField
} from 'discord.js';

import { Config, Embed, getConfig } from '../config/config';
import { BotCounters } from '../utils/otherTypes';
import { BotClient } from './BotClient';

export class ErryFunctions {
  client: BotClient
  status: number
  config: Config
  constructor(client: BotClient) {
    this.client = client;
    this.status = 0
    this.config = getConfig()
  }
  async clearCache() {
      try {
        var keys = await this.client.cache.keys("*")
        for (var key of keys) {
          await this.client.cache.set(key, JSON.stringify({}))
        }
        return true;
      }catch (e) {
          this.client.logger.error(e as Error)
        return false;
      }
  }
  formatMS(millis: number, ls: LocaleString): string {
    let localization = {
      m: this.client.lang.translate("common.metrics.minutesShort", ls),
      s: this.client.lang.translate("common.metrics.secondsShort", ls),
      h: this.client.lang.translate("common.metrics.hoursShort", ls),
      seconds: this.client.lang.translate("common.metrics.seconds", ls)
    }
    let val = millis < 0 ? true : false;
    if (millis < 0) {
      millis = -millis;
    }
    let s: number | string = Math.floor((millis / 1000) % 60);
    let m: number | string = Math.floor((millis / (1000 * 60)) % 60);
    let h: number | string = Math.floor((millis / (1000 * 60 * 60)) % 24);
    h = h < 10 ? "0" + h : h.toString();
    m = m < 10 ? "0" + m : m.toString();
    s = s < 10 ? "0" + s : s.toString();
    if (h == "00" || h == "0") return val ? "-" + m + `${localization.m} ` + s + `${localization.s} | ` + "-" + Math.floor((millis / 1000)) + ` ${localization.seconds}` : m + `${localization.m} ` + s + `${localization.s} | ` + Math.floor((millis / 1000)) + " Seconds";
    else return val ? "-" + h + `${localization.h} ` + m + `${localization.m} ` + s + `${localization.s} | ` + "-" + Math.floor((millis / 1000)) + ` ${localization.seconds}` : h + `${localization.h} ` + m + `${localization.m} ` + s + `${localization.s} | ` + Math.floor((millis / 1000)) + " Seconds";
  }
  parseEmojis(stringInput: string, filterDupes: boolean): { str: string; parsed: PartialEmoji | null; }[] {
    const emojiMatches = /(<?(a)?:?(\w{2,32}):(\d{17,19})>?|(?:\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c\udffb|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb\udffc]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffd]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5\udeeb\udeec\udef4-\udefa\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd71\udd73-\udd76\udd7a-\udda2\udda5-\uddaa\uddae-\uddb4\uddb7\uddba\uddbc-\uddca\uddd0\uddde-\uddff\ude70-\ude73\ude78-\ude7a\ude80-\ude82\ude90-\ude95]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f)/g;
    const matches = [...stringInput.matchAll(emojiMatches)];
    if(!matches.length) return [];
    const matchedEmojis = matches.map(x => {
      const [unicode, animated, name, id] = x.slice(1);
      const str = id && name ? `<${animated||""}:${name}:${id}>` : unicode;
      return { str, parsed: parseEmoji(str) }
    });
    return filterDupes ? matchedEmojis.reduce((a: { str: string; parsed: PartialEmoji | null; }[], c: { str: string; parsed: PartialEmoji | null; }) => !a.find(item => item.str === c.str) ? a.concat([c]) : a, []) : matchedEmojis;
  }
  async statusUpdater(): Promise<void> {
    const shardIds = [...this.client.cluster.ids.keys()];
    const { guilds, members } = await this.client.cluster.broadcastEval("this.counters", {timeout: 15000}).then((x: BotCounters[]) => {
      return {
        guilds: x.map(v => v.guilds || 0).reduce((a, b) => a + b, 0),
        members: x.map(v => v.members || 0).reduce((a, b) => a + b, 0)
      }
    }).catch((e) => {
      this.client.logger.error(e);
      return { guilds: 0, members: 0 }
    })
    for (let i = shardIds.length - 1; i >= 0; i--) {
      const shardId = shardIds[i];
      this.status + 1 >= this.config.status.activities.length ? this.status = 0 : this.status += 1
      this.client.logger.debug(`Updating status to index ${this.status}`)
      this.client.user?.setPresence({
          activities: [{ 
            name: `${this.config.status.activities[this.status].text}`
              //.replaceAll("{commandsused}", stats?.commandsUsed)
              //.replaceAll("{songsplayed}", stats?.songsPlayed)
              .replaceAll("{guilds}", String(guilds))
              .replaceAll("{members}", String(members))
              .replaceAll("{shard}", shardId)
              .replaceAll("{cluster}", String(this.client.cluster.id)), 
            type: ActivityType[this.config.status.activities[this.status].type],
            url: this.config.status.activities[this.status].url || undefined
          }],
          status: this.config.status.status
      });
    }
  }
  uniqueArray(arr: any[]): any[] {
    var date = Date.now()
    const result = arr.filter((element, index) => arr.indexOf(element) === index);
    this.client.logger.debug(`Checked for duplicates in ${Date.now()-date}ms`)
    return result;
  }
  checkPermsForGuild(guild: Guild): {status: boolean, missing?: string[]} {
    var me = guild.members.me
    if (!me) return {status: true};
    var missing = []
    if (me.permissions.has(PermissionsBitField.Flags.SendMessages)) missing.push(PermissionsBitField.Flags.SendMessages);
    if (me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) missing.push(PermissionsBitField.Flags.EmbedLinks);
    if (me.permissions.has(PermissionsBitField.Flags.AttachFiles)) missing.push(PermissionsBitField.Flags.AttachFiles);
    if (me.permissions.has(PermissionsBitField.Flags.Connect)) missing.push(PermissionsBitField.Flags.Connect);
    if (me.permissions.has(PermissionsBitField.Flags.ManageChannels)) missing.push(PermissionsBitField.Flags.ManageChannels);
    if (me.permissions.has(PermissionsBitField.Flags.ManageMessages)) missing.push(PermissionsBitField.Flags.ManageMessages);
    if (me.permissions.has(PermissionsBitField.Flags.Speak)) missing.push(PermissionsBitField.Flags.Speak);
    if (me.permissions.has(PermissionsBitField.Flags.UseExternalEmojis)) missing.push(PermissionsBitField.Flags.UseExternalEmojis);
    if (missing?.length >= 1) return {status: false, missing: new PermissionsBitField(missing).toArray()};
    return {status: true};
  }
  checkPermsForChannel(channel: GuildChannel): {status: boolean, missing?: string[]} {
    const user = channel.guild.members.me
    if (user) var me = channel.permissionsFor(user)
    else return {status: true};
    var missing = []
    if (textBasedCats.includes(channel.type)) {
      if (me.has(PermissionsBitField.Flags.SendMessages)) missing.push(PermissionsBitField.Flags.SendMessages);
      if (me.has(PermissionsBitField.Flags.EmbedLinks)) missing.push(PermissionsBitField.Flags.EmbedLinks);
      if (me.has(PermissionsBitField.Flags.AttachFiles)) missing.push(PermissionsBitField.Flags.AttachFiles);
      if (me.has(PermissionsBitField.Flags.ManageChannels)) missing.push(PermissionsBitField.Flags.ManageChannels);
      if (me.has(PermissionsBitField.Flags.ManageMessages)) missing.push(PermissionsBitField.Flags.ManageMessages);
      if (me.has(PermissionsBitField.Flags.UseExternalEmojis)) missing.push(PermissionsBitField.Flags.UseExternalEmojis);
    }
    if (voiceBasedCats.includes(channel.type)) {
      if (me.has(PermissionsBitField.Flags.SendMessages)) missing.push(PermissionsBitField.Flags.SendMessages);
      if (me.has(PermissionsBitField.Flags.EmbedLinks)) missing.push(PermissionsBitField.Flags.EmbedLinks);
      if (me.has(PermissionsBitField.Flags.AttachFiles)) missing.push(PermissionsBitField.Flags.AttachFiles);
      if (me.has(PermissionsBitField.Flags.Connect)) missing.push(PermissionsBitField.Flags.Connect);
      if (me.has(PermissionsBitField.Flags.ManageChannels)) missing.push(PermissionsBitField.Flags.ManageChannels);
      if (me.has(PermissionsBitField.Flags.ManageMessages)) missing.push(PermissionsBitField.Flags.ManageMessages);
      if (me.has(PermissionsBitField.Flags.Speak)) missing.push(PermissionsBitField.Flags.Speak);
      if (me.has(PermissionsBitField.Flags.UseExternalEmojis)) missing.push(PermissionsBitField.Flags.UseExternalEmojis);
    }
    if (missing?.length >= 1) return {status: false, missing: new PermissionsBitField(missing).toArray()};
    return {status: true};
  }
  getFooter(es: Embed, stringurl?: string, customText?: string): EmbedFooterOptions { 
    let text = es.footertext;
    let iconURL: string|undefined = stringurl ? stringurl : es.footericon;
    if (customText) text = customText
    if(!text || text.length < 1) text = `${this.client.user?.username || this.config.botName} | By: rocky_pup`;
    if(!iconURL || iconURL.length < 1) iconURL = `${this.client.user?.displayAvatarURL()}`;
    iconURL = iconURL.trim();
    text = text.trim().substring(0, 2000);
    if(!iconURL.startsWith("https://") && !iconURL.startsWith("http://")) iconURL = this.client.user?.displayAvatarURL();
    if(![".png", ".jpg", ".wpeg", ".webm", ".gif", ".webp"].some(d => iconURL?.toLowerCase().endsWith(d))) iconURL = this.client.user?.displayAvatarURL();
    return { text, iconURL }
  };
  getAuthor(authorname: string, authoricon?: string, authorurl?: string): EmbedAuthorOptions {
    let name = authorname;
    let iconURL = authoricon;
    let url = authorurl;
    if(!iconURL || iconURL.length < 1) iconURL = `${this.client.user?.displayAvatarURL()}`;
    if(!url || url.length < 1) url = `https://dsc.gg/banditcamp`;
    iconURL = iconURL.trim();
    name = `${name.trim().substring(0, 25)}`
    if(!url.startsWith("https://") && !url.startsWith("http://")) url = `https://dsc.gg/banditcamp`;
    if(!iconURL.startsWith("https://") && !iconURL.startsWith("http://")) iconURL = this.client.user?.displayAvatarURL();
    if(![".png", ".jpg", ".wpeg", ".webm", ".gif"].some(d => iconURL?.toLowerCase().endsWith(d))) iconURL = this.client.user?.displayAvatarURL();
    return { name: name, iconURL: iconURL, url: url }
  };
  async createNewGuildDatabase(guild_id: string): Promise<boolean> {
    this.client.logger.debug(`Called databasing for guild ${guild_id}`)
    const settingsDb = await this.client.db.settings.findUnique({
      where: {
        guildId: guild_id
      }
    })
    const es = await this.client.db.embed.findUnique({
      where: {
        guildId: guild_id
      }
    })
    if (!settingsDb || !settingsDb.language) {
      await this.client.db.settings.create({
        data: {
          guildId: guild_id,
          language: this.config.defaultLanguage
        }
      })
    }
    if (!es || !es.color) {
      await this.client.db.embed.create({
        data: {
          color: String(this.config.embed.color),
          wrongcolor: String(this.config.embed.wrongcolor),
          warncolor: String(this.config.embed.warncolor),
          footertext: String(this.config.embed.footertext),
          footericon: String(this.config.embed.footericon),
          guildId: guild_id
        }
      })
    }
    this.client.logger.debug(`Databasing finished for guild ${guild_id}`)
    return true;
  }
}

export const textBasedCats = [ChannelType.GuildText, ChannelType.AnnouncementThread, ChannelType.PublicThread, ChannelType.PrivateThread, ChannelType.GuildCategory, ChannelType.GuildAnnouncement];
export const voiceBasedCats = [ChannelType.GuildStageVoice, ChannelType.GuildVoice];

export class ErryErrorEmbed extends EmbedBuilder {
  constructor(es: Embed, exclude?: {footer?: boolean, timestamp?: boolean}) {
    super();
    this.setColor(es.wrongcolor);
    !exclude?.footer && this.setFooter({text: es.footertext, iconURL: !es.footericon || es.footericon == "" ? undefined : es.footericon})
    !exclude?.timestamp && this.setTimestamp()
  }
}
export class ErrySuccessEmbed extends EmbedBuilder {
  constructor(es: Embed, exclude?: {footer?: boolean, timestamp?: boolean}) {
    super();
    this.setColor(es.color);
    !exclude?.footer && this.setFooter({text: es.footertext, iconURL: !es.footericon || es.footericon == "" ? undefined : es.footericon})
    !exclude?.timestamp && this.setTimestamp()
  }
}
export class ErryWarningEmbed extends EmbedBuilder {
  constructor(es: Embed, exclude?: {footer?: boolean, timestamp?: boolean}) {
    super();
    this.setColor(es.warncolor);
    !exclude?.footer && this.setFooter({text: es.footertext, iconURL: !es.footericon || es.footericon == "" ? undefined : es.footericon})
    !exclude?.timestamp && this.setTimestamp()
  }
}