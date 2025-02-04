import { Outlet, useLocation } from "react-router-dom";

import { FriendPageNavbar } from "@-components/navbar/FriendsPageNavbar";
import { FriendsPageStyle } from "@-styles";

import { FriendsPage } from "./FriendsPage";

export const FriendsLayoutPage = () => {
  const { pathname } = useLocation();
  return (
    <FriendsPageStyle>
      <FriendPageNavbar />
      {pathname === "/friends" && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  );
};
