import { FC } from "react";
import { MdCheck, MdClose } from "react-icons/md";

import { FriendRequestItemIconStyle } from "@-styles";
import {
  FriendRequestDetailsType,
  HandleFriendRequestAction,
} from "@-utils/types";

type Props = {
  details: FriendRequestDetailsType;
  handleFriendRequest: (type?: HandleFriendRequestAction) => void;
};

export const FriendRequestIcons: FC<Props> = ({
  details,
  handleFriendRequest,
}) => {
  return (
    <div className="icons">
      {details.incoming && (
        <FriendRequestItemIconStyle
          isAccept={true}
          onClick={() => handleFriendRequest("accept")}
        >
          <MdCheck />
        </FriendRequestItemIconStyle>
      )}
      <FriendRequestItemIconStyle
        onClick={() =>
          details.incoming
            ? handleFriendRequest("reject")
            : handleFriendRequest()
        }
      >
        <MdClose />
      </FriendRequestItemIconStyle>
    </div>
  );
};
