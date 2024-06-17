import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DynamicButtonStyle,
  FriendsNavbarStyle,
  FriendsNavbarItemStyle,
} from "@-styles";
import { friendsNavbarItems } from "@-utils/constants";

import { CreateFriendRequestModal } from "../modals/CreateFriendRequestModal";

export const FriendPageNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <CreateFriendRequestModal setShowModal={setShowModal} />}
      <FriendsNavbarStyle>
        <div className="navLinks">
          {friendsNavbarItems.map((item) => (
            <FriendsNavbarItemStyle
              key={item.id}
              active={pathname === item.pathname}
              onClick={() => navigate(item.pathname)}
            >
              {item.label}
            </FriendsNavbarItemStyle>
          ))}
        </div>
        <DynamicButtonStyle
          size="sm"
          flex={true}
          variant="primary"
          onClick={() => setShowModal(true)}
        >
          <AiOutlineUserAdd size={24} />
          <span>Add Friend</span>
        </DynamicButtonStyle>
      </FriendsNavbarStyle>
    </>
  );
};
