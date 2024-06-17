import { useEffect } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState, removeFriendRequest } from "@-store";
import { useSocketContext } from "@-utils/context";
import { AcceptFriendRequestResponse, FriendRequest } from "@-utils/types";

import { useToast } from "../../useToast";

export function useFriendRequestReceiving() {
  const socket = useSocketContext();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { info } = useToast({ theme: "dark" });

  const { isReceivingCall } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    console.log("Registering all events for AppPage");
    socket.on("onFriendRequestCancelled", (payload: FriendRequest) => {
      console.log("onFriendRequestCancelled");
      console.log(payload);
      dispatch(removeFriendRequest(payload));
    });

    socket.on(
      "onFriendRequestAccepted",
      (payload: AcceptFriendRequestResponse) => {
        console.log("onFriendRequestAccepted");
        dispatch(removeFriendRequest(payload.friendRequest));
        socket.emit("getOnlineFriends");
        info(
          `${payload.friendRequest.receiver.firstName} accepted your friend request`,
          {
            position: "bottom-left",
            icon: BsFillPersonCheckFill,
            onClick: () => navigate("/friends"),
          },
        );
      },
    );

    socket.on("onFriendRequestRejected", (payload: FriendRequest) => {
      console.log("onFriendRequestRejected");
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.off("onFriendRequestCancelled");
      socket.off("onFriendRequestRejected");
      socket.off("onFriendRequestReceived");
      socket.off("onFriendRequestAccepted");
    };
  }, [socket, isReceivingCall]);
}
