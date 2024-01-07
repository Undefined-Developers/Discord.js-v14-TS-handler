export function transformAttachment(bot, payload) {
    const attachment = {
        id: bot.transformers.snowflake(payload.id),
        filename: payload.filename,
        contentType: payload.content_type,
        size: payload.size,
        url: payload.url,
        proxyUrl: payload.proxy_url,
        height: payload.height ?? undefined,
        width: payload.width ?? undefined,
        ephemeral: payload.ephemeral,
    };
    return attachment;
}
