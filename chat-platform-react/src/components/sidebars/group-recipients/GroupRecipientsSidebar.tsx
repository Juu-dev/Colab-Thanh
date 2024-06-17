import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  setGRContextMenuLocation,
  setSelectedUser,
  toggleGRContextMenu,
  AppDispatch,
  RootState,
  selectGroupById,
} from "@-store";
import {
  GroupRecipientSidebarItemContainerStyle,
  GroupRecipientsSidebarHeaderStyle,
  GroupRecipientsSidebarStyle,
} from "@-styles";
import { SocketContext } from "@-utils/context";
import { User } from "@-utils/types";

import { OfflineGroupRecipients } from "./OfflineGroupRecipients";
import { OnlineGroupRecipients } from "./OnlineGroupRecipients";
import { SelectedParticipantContextMenu } from "../../context-menus/SelectedParticipantContextMenu";

export const GroupRecipientsSidebar = () => {
  const { id: groupId } = useParams();

  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!)),
  );
  const groupSidebarState = useSelector(
    (state: RootState) => state.groupSidebar,
  );

  useEffect(() => {
    const handleClick = () => dispatch(toggleGRContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [groupId]);

  useEffect(() => {
    socket.emit("getOnlineGroupUsers", { groupId });
    const interval = setInterval(() => {
      socket.emit("getOnlineGroupUsers", { groupId });
    }, 5000);
    socket.on("onlineGroupUsersReceived", (payload) => {
      console.log("received onlineGroupUsersReceived event");
      console.log(payload);
      setOnlineUsers(payload.onlineUsers);
    });
    return () => {
      console.log("Clearing Interval for GroupRecipientsSidebar");
      clearInterval(interval);
      socket.off("onlineGroupUsersReceived");
    };
  }, [group, groupId]);

  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleGRContextMenu(false));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onUserContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: User,
  ) => {
    e.preventDefault();
    dispatch(toggleGRContextMenu(true));
    dispatch(setGRContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedUser(user));
  };

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeaderStyle>
        <span>Participants</span>
      </GroupRecipientsSidebarHeaderStyle>

      <GroupRecipientSidebarItemContainerStyle>
        <span>Online Users</span>
        <OnlineGroupRecipients
          users={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />

        <span>Offline Users</span>
        <OfflineGroupRecipients
          onlineUsers={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        {groupSidebarState.showUserContextMenu && (
          <SelectedParticipantContextMenu points={groupSidebarState.points} />
        )}
      </GroupRecipientSidebarItemContainerStyle>
    </GroupRecipientsSidebarStyle>
  );
};
