import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  setIsEditing,
  setMessageBeingEdited,
  AppDispatch,
  RootState,
  deleteGroupMessageThunk,
  deleteMessageThunk,
  selectType,
} from "@-store";
import { ContextMenuStyle, ContextMenuItemStyle } from "@-styles";
import { AuthContext } from "@-utils/context";

export const SelectedMessageContextMenu = () => {
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const conversationType = useSelector((state: RootState) => selectType(state));
  const { selectedMessage: message, points } = useSelector(
    (state: RootState) => state.messageContainer,
  );

  const deleteMessage = () => {
    const id = parseInt(routeId!);
    console.log(`Delete message ${message?.id}`);
    if (!message) return;
    const messageId = message.id;
    return conversationType === "private"
      ? dispatch(deleteMessageThunk({ id, messageId: message.id }))
      : dispatch(deleteGroupMessageThunk({ id, messageId }));
  };

  const editMessage = () => {
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(message));
  };

  return (
    <ContextMenuStyle top={points.y} left={points.x}>
      {message?.author.id === user?.id && (
        <ContextMenuItemStyle onClick={deleteMessage}>
          Delete
        </ContextMenuItemStyle>
      )}
      {message?.author.id === user?.id && (
        <ContextMenuItemStyle onClick={editMessage}>Edit</ContextMenuItemStyle>
      )}
    </ContextMenuStyle>
  );
};
