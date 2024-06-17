import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGroups as fetchGroupsAPI,
  createGroup as createGroupAPI,
  removeGroupRecipient as removeGroupRecipientAPI,
  updateGroupOwner as updateGroupOwnerAPI,
  leaveGroup as leaveGroupAPI,
  updateGroupDetails as updateGroupDetailsAPI,
} from "@-utils/api";
import {
  CreateGroupParams,
  RemoveGroupRecipientParams,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from "@-utils/types";

import { updateGroup } from "./groupSlice";

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return fetchGroupsAPI();
});

export const createGroupThunk = createAsyncThunk(
  "groups/create",
  (params: CreateGroupParams) => createGroupAPI(params),
);

export const removeGroupRecipientThunk = createAsyncThunk(
  "groups/recipients/delete",
  (params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params),
);

export const updateGroupOwnerThunk = createAsyncThunk(
  "groups/owner/update",
  (params: UpdateGroupOwnerParams) => updateGroupOwnerAPI(params),
);

export const leaveGroupThunk = createAsyncThunk("groups/leave", (id: number) =>
  leaveGroupAPI(id),
);

export const updateGroupDetailsThunk = createAsyncThunk(
  "groups/update/details",
  async (payload: UpdateGroupDetailsPayload, thunkAPI) => {
    try {
      const { data: group } = await updateGroupDetailsAPI(payload);
      console.log("Updated Group Successful. Dispatching updateGroup");
      thunkAPI.dispatch(updateGroup({ group }));
      thunkAPI.fulfillWithValue(group);
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);
