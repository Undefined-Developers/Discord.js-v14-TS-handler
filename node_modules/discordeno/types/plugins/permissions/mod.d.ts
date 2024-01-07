import '../../_dnt.polyfills.js';
import { BotWithCache } from "./deps.js";
export declare function enablePermissionsPlugin<B extends BotWithCache = BotWithCache>(bot: B): B;
export * from "./src/permissions.js";
export * from "./src/components.js";
export default enablePermissionsPlugin;
