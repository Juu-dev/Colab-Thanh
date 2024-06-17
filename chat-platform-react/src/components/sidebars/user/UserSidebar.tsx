import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import {
  UserSidebarFooterStyle,
  UserSidebarHeaderStyle,
  UserSidebarScrollableContainerStyle,
  UserSidebarStyle,
} from "@-styles";
import { logoutUser as logoutUserAPI } from "@-utils/api";
import { userSidebarItems } from "@-utils/constants";
import { useAuthContext } from "@-utils/context";

import { UserSidebarItem } from "./UserSidebarItem";
import { UserAvatar } from "../../avatars/UserAvatar";
import { UpdatePresenceStatusModal } from "../../modals/UpdatePresenceStatusModal";

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logoutUser = () => {
    logoutUserAPI().finally(() => navigate("/login", { replace: true }));
  };

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}

      <UserSidebarStyle>
        <UserSidebarHeaderStyle>
          <UserAvatar user={user!} onClick={() => setShowModal(true)} />
        </UserSidebarHeaderStyle>

        <UserSidebarScrollableContainerStyle>
          {userSidebarItems.map((item) => (
            <UserSidebarItem item={item} />
          ))}
        </UserSidebarScrollableContainerStyle>

        <UserSidebarFooterStyle>
          <RiLogoutCircleLine size={30} onClick={() => logoutUser()} />
        </UserSidebarFooterStyle>
      </UserSidebarStyle>
    </>
  );
};
