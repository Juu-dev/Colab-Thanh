import { RootState } from "../config";

export const selectType = (state: RootState) =>
  state.selectedConversationType.type;
