import '../../_dnt.polyfills.js';
import { ApplicationCommandOptionChoice, Bot, Channel, Collection, CreateMessage, FinalHelpers, InteractionResponse, ListGuildMembers, Member, Message } from "./deps.js";
import { ModifyThread } from "./src/threads.js";
export declare type BotWithHelpersPlugin<B extends Bot = Bot> = Omit<B, "helpers"> & HelperFunctionsFromHelperPlugin;
export interface HelperFunctionsFromHelperPlugin {
    helpers: FinalHelpers & {
        fetchAndRetrieveMembers: (guildId: bigint) => Promise<Collection<bigint, Member>>;
        sendDirectMessage: (userId: bigint, content: string | CreateMessage) => Promise<Message>;
        sendTextMessage: (channelId: bigint, content: string | CreateMessage) => Promise<Message>;
        sendPrivateInteractionResponse: (id: bigint, token: string, options: InteractionResponse) => Promise<Message | undefined>;
        suppressEmbeds: (channelId: bigint, messageId: bigint) => Promise<Message>;
        archiveThread: (threadId: bigint) => Promise<Channel>;
        unarchiveThread: (threadId: bigint) => Promise<Channel>;
        lockThread: (threadId: bigint) => Promise<Channel>;
        unlockThread: (threadId: bigint) => Promise<Channel>;
        editThread: (threadId: bigint, options: ModifyThread, reason?: string) => Promise<Channel>;
        cloneChannel: (channel: Channel, reason?: string) => Promise<Channel>;
        sendAutocompleteChoices: (interactionId: bigint, interactionToken: string, choices: ApplicationCommandOptionChoice[]) => Promise<void>;
        disconnectMember: (guildId: bigint, memberId: bigint) => Promise<Member>;
        getMembersPaginated: (guildId: bigint, options: ListGuildMembers) => Promise<Collection<bigint, Member>>;
        moveMember: (guildId: bigint, memberId: bigint, channelId: bigint) => Promise<Member>;
    };
}
export declare function enableHelpersPlugin<B extends Bot = Bot>(rawBot: B): BotWithHelpersPlugin<B>;
export * from "./src/channels.js";
export * from "./src/disconnectMember.js";
export * from "./src/fetchAndRetrieveMembers.js";
export * from "./src/getMembersPaginated.js";
export * from "./src/moveMember.js";
export * from "./src/sendAutoCompleteChoices.js";
export * from "./src/sendDirectMessage.js";
export * from "./src/sendPrivateInteractionResponse.js";
export * from "./src/sendTextMessage.js";
export * from "./src/suppressEmbeds.js";
export * from "./src/threads.js";
export default enableHelpersPlugin;
