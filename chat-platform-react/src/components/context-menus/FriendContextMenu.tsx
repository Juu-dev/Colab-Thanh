import { useContext } from "react";
import { MdPersonRemove, MdOutlineTextsms } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  AppDispatch,
  RootState,
  toggleFriendContextMenu,
  removeFriendThunk,
} from "@-store";
import { ContextMenuStyle, ContextMenuItemStyle } from "@-styles";
import { checkConversationOrCreate } from "@-utils/api";
import { AuthContext, SocketContext } from "@-utils/context";

export const FriendContextMenu = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { points, selectedFriendContextMenu } = useSelector(
    (state: RootState) => state.friends,
  );
  const socket = useContext(SocketContext);

  const getUserFriendInstance = () =>
    user?.id === selectedFriendContextMenu?.sender.id
      ? selectedFriendContextMenu?.receiver
      : selectedFriendContextMenu?.sender;

  const removeFriend = () => {
    if (!selectedFriendContextMenu) return;
    dispatch(toggleFriendContextMenu(false));
    dispatch(removeFriendThunk(selectedFriendContextMenu.id)).then(() =>
      socket.emit("getOnlineFriends"),
    );
  };

  const sendMessage = () => {
    const recipient = getUserFriendInstance();
    recipient &&
      checkConversationOrCreate(recipient.id)
        .then(({ data }) => {
          console.log(data);
          navigate(`/conversations/${data.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <ContextMenuStyle top={points.y} left={points.x}>
      <ContextMenuItemStyle onClick={removeFriend}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Remove Friend</span>
      </ContextMenuItemStyle>
      <ContextMenuItemStyle onClick={sendMessage}>
        <MdOutlineTextsms size={20} color="#fff" />
        <span style={{ color: "#fff" }}>Message</span>
      </ContextMenuItemStyle>
    </ContextMenuStyle>
  );
};
