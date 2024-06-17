// @collapses
import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../config";

const selectConversations = (state: RootState) =>
  state.conversation.conversations;
const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) =>
    conversations.find((c) => c.id === conversationId),
);
