import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Group,
  Points,
  UpdateGroupAction,
  UpdateGroupPayload,
} from "@-utils/types";

import {
  fetchGroupsThunk,
  leaveGroupThunk,
  removeGroupRecipientThunk,
  updateGroupDetailsThunk,
  updateGroupOwnerThunk,
} from "./groupThunk";

export interface GroupState {
  groups: Group[];
  showGroupContextMenu: boolean;
  selectedGroupContextMenu?: Group;
  showEditGroupModal: boolean;
  points: Points;
  isSavingChanges: boolean;
}

const initialState: GroupState = {
  groups: [],
  showGroupContextMenu: false,
  showEditGroupModal: false,
  points: { x: 0, y: 0 },
  isSavingChanges: false,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} to state`);
      state.groups.unshift(action.payload);
    },
    updateGroup: (state, action: PayloadAction<UpdateGroupPayload>) => {
      console.log("Inside updateGroup");
      const { type, group } = action.payload;
      const existingGroup = state.groups.find((g) => g.id === group.id);
      const index = state.groups.findIndex((g) => g.id === group.id);
      if (!existingGroup) return;
      switch (type) {
        case UpdateGroupAction.NEW_MESSAGE: {
          console.log("Inside UpdateGroupAction.NEW_MESSAGE");
          state.groups.splice(index, 1);
          state.groups.unshift(group);
          break;
        }
        default: {
          console.log("Default Case for updateGroup");
          state.groups[index] = group;
          break;
        }
      }
    },
    removeGroup: (state, action: PayloadAction<Group>) => {
      console.log("removeGroup Reducer");
      const group = state.groups.find((g) => g.id === action.payload.id);
      const index = state.groups.findIndex((g) => g.id === action.payload.id);
      if (!group) return;
      state.groups.splice(index, 1);
    },
    toggleGroupContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showGroupContextMenu = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroupContextMenu = action.payload;
    },
    setGroupContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
    },
    setShowEditGroupModal: (state, action: PayloadAction<boolean>) => {
      state.showEditGroupModal = action.payload;
    },
    setIsSavingChanges: (state, action: PayloadAction<boolean>) => {
      state.isSavingChanges = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.groups = action.payload.data;
        console.log(state.groups);
      })
      .addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload;
        console.log("removeGroupRecipientThunk.fulfilled");
        const existingGroup = state.groups.find(
          (g) => g.id === updatedGroup.id,
        );
        const index = state.groups.findIndex((g) => g.id === updatedGroup.id);
        if (existingGroup) {
          state.groups[index] = updatedGroup;
          console.log("Updating Group....");
        }
      })
      .addCase(updateGroupOwnerThunk.fulfilled, (state, action) => {
        console.log("updateGroupOwnerThunk.fulfilled");
      })
      .addCase(leaveGroupThunk.fulfilled, (state, action) => {
        console.log("leaveGroupThunk.fulfilled");
      })
      .addCase(updateGroupDetailsThunk.fulfilled, (state, action) => {
        console.log("updateGroupDetailsThunk.fulfilled");
      });
  },
});

export const {
  addGroup,
  updateGroup,
  removeGroup,
  toggleGroupContextMenu,
  setGroupContextMenuLocation,
  setSelectedGroup,
  setShowEditGroupModal,
  setIsSavingChanges,
} = groupsSlice.actions;

export default groupsSlice.reducer;
