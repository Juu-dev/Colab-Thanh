// @collapses
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getConversations, postNewConversation } from "@-utils/api";
import { CreateConversationParams } from "@-utils/types";

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  },
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (data: CreateConversationParams) => {
    return postNewConversation(data);
  },
);
