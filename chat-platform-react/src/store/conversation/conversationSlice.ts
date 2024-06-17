// @collapses
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Conversation } from "@-utils/types";

import {
  createConversationThunk,
  fetchConversationsThunk,
} from "./conversationThunk";

export interface ConversationsState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("addConversation");
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("Inside updateConversation");
      const conversation = action.payload;
      const index = state.conversations.findIndex(
        (c) => c.id === conversation.id,
      );
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        console.log("Fulfilled");
        console.log(action.payload.data);
        state.conversations.unshift(action.payload.data);
      });
  },
});

// Action creators are generated for each case reducer function
export const { addConversation, updateConversation } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
