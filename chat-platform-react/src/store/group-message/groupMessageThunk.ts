import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteGroupMessage as deleteGroupMessageAPI,
  fetchGroupMessages as fetchGroupMessagesAPI,
  editGroupMessage as editGroupMessageAPI,
} from "@-utils/api";
import { DeleteGroupMessageParams, EditMessagePayload } from "@-utils/types";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "groupMessages/fetch",
  (id: number) => fetchGroupMessagesAPI(id),
);

export const deleteGroupMessageThunk = createAsyncThunk(
  "groupMessages/delete",
  (params: DeleteGroupMessageParams) => deleteGroupMessageAPI(params),
);

export const editGroupMessageThunk = createAsyncThunk(
  "groupMessages/edit",
  (params: EditMessagePayload) => editGroupMessageAPI(params),
);
