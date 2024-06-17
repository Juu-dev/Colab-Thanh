import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppDispatch,
  RootState,
  setFriendContextMenuLocation,
  setSelectedFriend,
  toggleFriendContextMenu,
} from "@-store";
import { FriendListContainerStyle } from "@-styles";
import { ContextMenuEvent, Friend } from "@-utils/types";

import { FriendListItem } from "./FriendListItem";
import { FriendContextMenu } from "../context-menus/FriendContextMenu";

export const FriendList = () => {
  const { showContextMenu, friends, onlineFriends } = useSelector(
    (state: RootState) => state.friends,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClick = () => dispatch(toggleFriendContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const onContextMenu = (e: ContextMenuEvent, friend: Friend) => {
    e.preventDefault();
    console.log("Friend Context Menu");
    dispatch(toggleFriendContextMenu(true));
    dispatch(setFriendContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedFriend(friend));
  };

  return (
    <FriendListContainerStyle>
      {onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
      {onlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onContextMenu={onContextMenu}
          online={true}
        />
      ))}
      <span>Offline</span>
      {friends
        .filter(
          (friend) =>
            !onlineFriends.find(
              (onlineFriend) => onlineFriend.id === friend.id,
            ),
        )
        .map((friend) => (
          <FriendListItem
            key={friend.id}
            friend={friend}
            onContextMenu={onContextMenu}
            online={false}
          />
        ))}
      {showContextMenu && <FriendContextMenu />}
    </FriendListContainerStyle>
  );
};
