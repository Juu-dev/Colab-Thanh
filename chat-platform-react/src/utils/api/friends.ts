import {
  AcceptFriendRequestResponse,
  CancelFriendRequestResponse,
  Friend,
  FriendRequest,
} from "@-utils/types";

import { axiosClient, config } from "./api.config";

export const fetchFriends = () => axiosClient.get<Friend[]>("/friends", config);

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>("/friends/requests", config);

export const createFriendRequest = (username: string) =>
  axiosClient.post<FriendRequest>("/friends/requests", { username }, config);

export const cancelFriendRequest = (id: number) =>
  axiosClient.delete<CancelFriendRequestResponse>(
    `/friends/requests/${id}/cancel`,
    config,
  );

export const acceptFriendRequest = (id: number) =>
  axiosClient.patch<AcceptFriendRequestResponse>(
    `/friends/requests/${id}/accept`,
    {},
    config,
  );

export const rejectFriendRequest = (id: number) =>
  axiosClient.patch<FriendRequest>(
    `/friends/requests/${id}/reject`,
    {},
    config,
  );

export const removeFriend = (id: number) =>
  axiosClient.delete<Friend>(`/friends/${id}/delete`, config);
