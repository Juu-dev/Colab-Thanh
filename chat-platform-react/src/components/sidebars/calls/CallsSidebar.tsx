import { useSelector } from "react-redux";

import { RootState } from "@-store";
import {
  ScrollableContainerStyle,
  SidebarHeaderStyle,
  SidebarStyle,
} from "@-styles";

import { CallSidebarItem } from "./CallSidebarItem";

export const CallsSidebar = () => {
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <SidebarStyle>
      <SidebarHeaderStyle>Friends</SidebarHeaderStyle>
      <ScrollableContainerStyle>
        {friends.map((friend) => (
          <CallSidebarItem friend={friend} />
        ))}
      </ScrollableContainerStyle>
    </SidebarStyle>
  );
};
