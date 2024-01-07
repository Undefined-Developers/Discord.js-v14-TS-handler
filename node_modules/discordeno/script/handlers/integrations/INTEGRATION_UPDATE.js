"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIntegrationUpdate = void 0;
function handleIntegrationUpdate(bot, data) {
    bot.events.integrationUpdate(bot, bot.transformers.integration(bot, data.d));
}
exports.handleIntegrationUpdate = handleIntegrationUpdate;
