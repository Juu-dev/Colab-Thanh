import { RegisterParams, User, LoginParams } from "@-utils/types";

import { axiosClient, config } from "./api.config";

export const postRegisterUser = (data: RegisterParams) =>
  axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: LoginParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const logoutUser = () => axiosClient.post("/auth/logout", {}, config);
