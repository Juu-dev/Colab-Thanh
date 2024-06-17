import { FC, useContext } from "react";
import { IoMdVideocam, IoMdCall } from "react-icons/io";

import { CallSidebarItemContainerStyle } from "@-styles";
import { AuthContext } from "@-utils/context";
import { getUserFriendInstance } from "@-utils/helpers";
import { Friend } from "@-utils/types";

import { UserAvatar } from "../../avatars/UserAvatar";

type Props = {
  friend: Friend;
};
export const CallSidebarItem: FC<Props> = ({ friend }) => {
  const iconSize = 32;
  const { user } = useContext(AuthContext);
  return (
    <CallSidebarItemContainerStyle>
      <div>
        <UserAvatar user={getUserFriendInstance(user!, friend)} />
      </div>
      <div>
        <div>
          <span className="username">{user?.username}</span>
        </div>
        <div className="icons">
          <div className="icon">
            <IoMdVideocam size={iconSize} />
          </div>
          <div className="icon">
            <IoMdCall size={iconSize} />
          </div>
        </div>
      </div>
    </CallSidebarItemContainerStyle>
  );
};
