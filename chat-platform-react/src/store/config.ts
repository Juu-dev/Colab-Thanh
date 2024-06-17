import { configureStore } from "@reduxjs/toolkit";

import callReducer from "./call/callSlice";
import conversationReducer from "./conversation/conversationSlice";
import friendsReducer from "./friends/friendsSlice";
import groupsReducer from "./group/groupSlice";
import groupMessagesReducer from "./group-message/groupMessageSlice";
import groupSidebarReducer from "./group-recipients/groupRecipientsSidebarSlice";
import messageContainerReducer from "./message-container/messageContainerSlice";
import messagePanelReducer from "./message-panel/messagePanelSlice";
import messageReducer from "./messages/messageSlice";
import rateLimitReducer from "./rate-limit/rateLimitSlice";
import selectedTypeReducer from "./selected/selectedTypeSlice";
import settingsReducer from "./settings/settingsSlice";
import systemMessageReducer from "./system-messages/systemMessagesSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    messages: messageReducer,
    selectedConversationType: selectedTypeReducer,
    friends: friendsReducer,
    groups: groupsReducer,
    groupMessages: groupMessagesReducer,
    messageContainer: messageContainerReducer,
    groupSidebar: groupSidebarReducer,
    rateLimit: rateLimitReducer,
    messagePanel: messagePanelReducer,
    systemMessages: systemMessageReducer,
    settings: settingsReducer,
    call: callReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
