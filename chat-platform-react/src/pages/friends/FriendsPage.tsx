import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { FriendList } from "@-components/friends/FriendList";
import {
  AppDispatch,
  removeFriend,
  setOfflineFriends,
  setOnlineFriends,
  fetchFriendsThunk,
} from "@-store";
import { SocketContext } from "@-utils/context";
import { Friend } from "@-utils/types";

export const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.emit("getOnlineFriends");
    const interval = setInterval(() => {
      socket.emit("getOnlineFriends");
    }, 10000);

    socket.on("onFriendRemoved", (friend: Friend) => {
      console.log("onFriendRemoved");
      dispatch(removeFriend(friend));
      socket.emit("getOnlineFriends");
    });

    return () => {
      console.log("clearing interval");
      clearInterval(interval);
      socket.off("getOnlineFriends");
      socket.off("onFriendRemoved");
    };
  }, []);

  useEffect(() => {
    socket.on("getOnlineFriends", (friends: Friend[]) => {
      console.log("received online friends");
      console.log(friends);
      dispatch(setOnlineFriends(friends));
      dispatch(setOfflineFriends());
    });
  }, []);

  return <FriendList />;
};
