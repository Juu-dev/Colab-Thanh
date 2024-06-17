import { UpdateStatusParams, User } from "@-utils/types";

import { axiosClient, config } from "./api.config";

export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const completeUserProfile = (data: FormData) =>
  axiosClient.post("/users/profiles", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const checkUsernameExists = (username: string) =>
  axiosClient.get(`/users/check?username=${username}`, config);

export const updateUserProfile = (data: FormData) =>
  axiosClient.patch<User>("/users/profiles", data, {
    ...config,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateStatusMessage = (data: UpdateStatusParams) =>
  axiosClient.patch("/users/presence/status", data, config);
