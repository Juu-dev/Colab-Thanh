import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../config";

const selectConversationMessages = (state: RootState) =>
  state.messages.messages;

const selectConversationMessageId = (state: RootState, id: number) => id;

export const selectConversationMessage = createSelector(
  [selectConversationMessages, selectConversationMessageId],
  (conversationMessages, id) => conversationMessages.find((cm) => cm.id === id),
);
