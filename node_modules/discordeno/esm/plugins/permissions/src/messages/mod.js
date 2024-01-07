import setupCreateMessagePermChecks from "./create.js";
import setupDeleteMessagePermChecks from "./delete.js";
import setupGetMessagePermChecks from "./get.js";
import setupPinMessagePermChecks from "./pin.js";
import setupReactionsPermChecks from "./reactions.js";
export default function setupMessagesPermChecks(bot) {
    setupReactionsPermChecks(bot);
    setupDeleteMessagePermChecks(bot);
    setupGetMessagePermChecks(bot);
    setupPinMessagePermChecks(bot);
    setupCreateMessagePermChecks(bot);
}
