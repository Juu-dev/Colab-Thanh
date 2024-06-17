import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useHandleClick, useKeydown } from "@-hooks";
import {
  editMessageContent,
  resetMessageContainer,
  setMCContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleMCContextMenu,
  AppDispatch,
  RootState,
  selectGroupMessage,
  selectConversationMessage,
  selectType,
} from "@-store";
import {
  MessageContainerStyle,
  MessageItemContainerStyle,
  MessageItemDetailsStyle,
} from "@-styles";
import { GroupMessageType, MessageType } from "@-utils/types";

import { MessageItemContainerBody } from "./MessageItemContainerBody";
import { MessageItemHeader } from "./MessageItemHeader";
import { SystemMessageList } from "./system/SystemMessageList";
import { UserAvatar } from "../avatars/UserAvatar";
import { SelectedMessageContextMenu } from "../context-menus/SelectedMessageContextMenu";

export const MessageContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!)),
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!)),
  );
  const selectedType = useSelector((state: RootState) => selectType(state));
  const { showContextMenu } = useSelector(
    (state: RootState) => state.messageContainer,
  );
  const handleKeydown = (e: KeyboardEvent) =>
    e.key === "Escape" && dispatch(setIsEditing(false));
  const handleClick = () => dispatch(toggleMCContextMenu(false));

  useKeydown(handleKeydown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id]);

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType | GroupMessageType,
  ) => {
    e.preventDefault();
    dispatch(toggleMCContextMenu(true));
    dispatch(setMCContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));

  const mapMessages = (
    message: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[],
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      messages.length === index + 1 ||
      currentMessage.author.id !== nextMessage.author.id;
    return (
      <MessageItemContainerStyle
        key={message.id}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader && <UserAvatar user={message.author} />}
        {showMessageHeader ? (
          <MessageItemDetailsStyle>
            <MessageItemHeader message={message} />
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding="8px 0 0 0"
            />
          </MessageItemDetailsStyle>
        ) : (
          <MessageItemContainerBody
            message={message}
            onEditMessageChange={onEditMessageChange}
            padding="0 0 0 70px"
          />
        )}
      </MessageItemContainerStyle>
    );
  };

  return (
    <MessageContainerStyle
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const scrollTopMax = node.scrollHeight - node.clientHeight;
        if (-scrollTopMax === node.scrollTop) {
          console.log("");
        }
      }}
    >
      <>
        <SystemMessageList />
        {selectedType === "private"
          ? conversationMessages?.messages.map(mapMessages)
          : groupMessages?.messages.map(mapMessages)}
      </>
      {showContextMenu && <SelectedMessageContextMenu />}
    </MessageContainerStyle>
  );
};
