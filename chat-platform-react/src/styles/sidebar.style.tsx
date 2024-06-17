// @collapses
import { Theme } from "@-utils/themes";
import styled from "styled-components";

export const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme.conversationSidebar.backgroundColor};
  flex: 0 0 auto;
  @media (max-width: 800px) {
    width: calc(100% - 80px);
  }
`;

export const SidebarHeaderStyle = styled.header`
  height: 90px;
  padding: 10px 30px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SidebarContainerStyle = styled.div``;

export const SidebarContainerItemStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 32px;
  margin: 18px 0;
`;

export const SidebarContainerItemContentStyle = styled.div`
  & .name {
    display: block;
    font-size: 18px;
    font-weight: 600;
  }
  & .lastMessage {
    display: block;
    font-size: 16px;
    color: #797979;
    font-weight: 500;
  }
`;

export const CallSidebarItemContainerStyle = styled.div``;
