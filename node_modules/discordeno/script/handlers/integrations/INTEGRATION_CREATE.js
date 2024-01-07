"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIntegrationCreate = void 0;
function handleIntegrationCreate(bot, data) {
    bot.events.integrationCreate(bot, bot.transformers.integration(bot, data.d));
}
exports.handleIntegrationCreate = handleIntegrationCreate;
