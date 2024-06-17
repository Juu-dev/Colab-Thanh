// @collapses
import { ConversationSelectedProps, ConversationSidebarItemProps } from "@-styles/styleTypes";
import styled, { css } from "styled-components";

export const SIDEBAR_WIDTH = 400;

export const ConversationSidebarContainerStyle = styled.div`
  margin-top: 100px;
`;

export const ConversationSidebarItemStyle = styled.div<ConversationSidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 32px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${({ selected, theme }) =>
    selected && theme.conversationSidebar.conversationItem.selected};
  cursor: pointer;
  transition: 100ms background-color ease;
  &:hover {
    background-color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.hover.backgroundColor};
  }

  & .title {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const ConversationSidebarItemDetailsStyle = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  & .conversationName {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.title.color};
  }
  & .conversationLastMessage {
    font-size: 15px;
    font-weight: 500;
    color: #868686;
    color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.title.lastMessageColor};
  }
`;

export const ConversationSelectedStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px 32px;
  background-color: #0f0f0f;
  border-bottom: 1px solid #4343435f;
  box-sizing: border-box;
`;

export const ConversationSelectedItemStyle = styled.div<ConversationSelectedProps>`
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  background-color: #212121;
  color: #f0f0f0;
  ${(props) =>
    props.selected &&
    css`
      background-color: #444444;
    `};
`;

export const ConversationSidebarStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin-left: 90px;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #111111;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /* width: 10px;
    height: 5px; */
  }
`;

export const ConversationSidebarHeaderStyle = styled.header`
  padding: 24px 32px;
  box-sizing: border-box;
  position: fixed;
  width: ${SIDEBAR_WIDTH}px;
  top: 0;
  left: 90px;
  z-index: 9;
  background-color: inherit;
`;

export const ConversationTabStyle = styled.section`
  display: flex;
  gap: 20px;
  margin: 14px 18px;
`;

export const ConversationTabItemStyle = styled.section<ConversationSelectedProps>`
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  background-color: #1f1f1f;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: 5px;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #383838;
    `};
`;

export const ConversationTabContainerStyle = styled.div``;

export const ConversationSearchbarStyle = styled.input`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  width: 100%;
  padding: 10px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'Inter';
  border-radius: 5px;
  box-sizing: border-box;
`;

export const ConversationCreateButtonStyle = styled.div`
  background-color: #1a1a1a;
  padding: 10px;
  box-sizing: border-box;
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ConversationCallContainerStyle = styled.div`
  height: 600px;
  background-color: #0e0e0e;
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 18px 0;
`;