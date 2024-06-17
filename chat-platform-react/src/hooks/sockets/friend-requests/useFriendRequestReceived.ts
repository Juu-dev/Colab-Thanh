import { useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, addFriendRequest } from "@-store";
import { useSocketContext } from "@-utils/context";
import { FriendRequest } from "@-utils/types";

import { useToast } from "../../useToast";

export function useFriendRequestReceived() {
  const socket = useSocketContext();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { info } = useToast({ theme: "dark" });

  useEffect(() => {
    socket.on("onFriendRequestReceived", (payload: FriendRequest) => {
      console.log("onFriendRequestReceived");
      console.log(payload);
      dispatch(addFriendRequest(payload));
      info(`Incoming Friend Request from ${payload.sender.firstName}`, {
        position: "bottom-left",
        icon: IoMdPersonAdd,
        onClick: () => navigate("/friends/requests"),
      });
    });

    return () => {
      socket.off("onFriendRequestReceived");
    };
  }, [dispatch, info, navigate, socket]);
}
