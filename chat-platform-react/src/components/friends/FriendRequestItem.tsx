import { FC, useContext } from "react";
import { useDispatch } from "react-redux";

import {
  AppDispatch,
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk,
} from "@-store";
import { FriendRequestItemContainerStyle } from "@-styles";
import { AuthContext } from "@-utils/context";
import { getFriendRequestDetails } from "@-utils/helpers";
import { FriendRequest, HandleFriendRequestAction } from "@-utils/types";

import { FriendRequestDetails } from "./friend-request/FriendRequestDetails";
import { FriendRequestIcons } from "./friend-request/FriendRequestIcons";

type Props = {
  friendRequest: FriendRequest;
};
export const FriendRequestItem: FC<Props> = ({ friendRequest }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const friendRequestDetails = getFriendRequestDetails(friendRequest, user);

  const handleFriendRequest = (type?: HandleFriendRequestAction) => {
    const { id } = friendRequest;
    switch (type) {
      case "accept":
        return dispatch(acceptFriendRequestThunk(id));
      case "reject":
        return dispatch(rejectFriendRequestThunk(id));
      default:
        return dispatch(cancelFriendRequestThunk(id));
    }
  };

  return (
    <FriendRequestItemContainerStyle>
      <FriendRequestDetails details={friendRequestDetails} />
      <FriendRequestIcons
        details={friendRequestDetails}
        handleFriendRequest={handleFriendRequest}
      />
    </FriendRequestItemContainerStyle>
  );
};
