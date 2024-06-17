import { ChatAdd } from "akar-icons";
import { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  AppDispatch,
  RootState,
  setSelectedGroup,
  setMCContextMenuLocation,
  toggleMCContextMenu,
} from "@-store";
import {
  SidebarContainerStyle,
  ConversationSearchbarStyle,
  SidebarHeaderStyle,
  SidebarStyle,
  ScrollableContainerStyle,
} from "@-styles";
import { ContextMenuEvent, Group } from "@-utils/types";

import { ConversationSidebarItem } from "./ConversationSidebarItem";
import { GroupSidebarContextMenu } from "../../context-menus/GroupSidebarContextMenu";
import { ConversationTab } from "../../conversations/ConversationTab";
import { GroupSidebarItem } from "../../groups/GroupSidebarItem";
import { CreateConversationModal } from "../../modals/CreateConversationModal";
import { CreateGroupModal } from "../../modals/CreateGroupModal";

export const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations,
  );
  const showGroupContextMenu = useSelector(
    (state: RootState) => state.groups.showGroupContextMenu,
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type,
  );

  const onGroupContextMenu = (event: ContextMenuEvent, group: Group) => {
    event.preventDefault();
    console.log("Group Context Menu");
    console.log(group);
    dispatch(toggleMCContextMenu(true));
    dispatch(setMCContextMenuLocation({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedGroup(group));
  };

  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleMCContextMenu(false));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClick = () => dispatch(toggleMCContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {showModal && conversationType === "private" && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}

      {showModal && conversationType === "group" && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}

      <SidebarStyle>
        <SidebarHeaderStyle>
          <ConversationSearchbarStyle placeholder="Search for Conversations" />
          {conversationType === "private" ? (
            <ChatAdd
              size={30}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <AiOutlineUsergroupAdd
              size={30}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          )}
        </SidebarHeaderStyle>

        <ConversationTab />

        <ScrollableContainerStyle>
          <SidebarContainerStyle>
            {conversationType === "private"
              ? conversations.map((conversation) => (
                  <ConversationSidebarItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))
              : groups.map((group) => (
                  <GroupSidebarItem
                    key={group.id}
                    group={group}
                    onContextMenu={onGroupContextMenu}
                  />
                ))}
            {showGroupContextMenu && <GroupSidebarContextMenu />}
          </SidebarContainerStyle>
        </ScrollableContainerStyle>

        <footer></footer>
      </SidebarStyle>
    </>
  );
};
