import styled from "styled-components";

import { SidebarItemProps } from "@-styles/styleTypes";
import { Theme } from "@-utils/themes";

import { ScrollableContainerStyle } from "./common.style";

export const UserAvatarStyle = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 55px;
  margin: 10px 0;
`;

export const UserSidebarStyle = styled.div`
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) =>
    theme.userSidebar.backgroundColor};
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserSidebarHeaderStyle = styled.header`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid #494949a9;
`;

export const UserSidebarTopStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0;
`;

export const UserSidebarTopIconsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
  gap: 40px;
`;

export const UserSidebarBottomStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserSidebarScrollableContainerStyle = styled(
  ScrollableContainerStyle,
)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserSidebarItemStyle = styled.div<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 18px;
  box-sizing: border-box;
  background-color: ${({ active }) => active && "#1e1e1e"};
  position: relative;
`;

export const FixedUserAvatarContainerStyle = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

export const UserSidebarFooterStyle = styled.footer`
  padding: 18px 0;
`;
