import {
  ConversationType,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessagePayload,
  MessageType,
} from "@-utils/types";

import { axiosClient, config } from "./api.config";

export const createMessage = (
  id: string,
  type: ConversationType,
  data: FormData,
) => {
  const url =
    type === "private"
      ? `/conversations/${id}/messages`
      : `/groups/${id}/messages`;
  return axiosClient.post(url, data, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });
};

export const deleteMessage = ({ id, messageId }: DeleteMessageParams) =>
  axiosClient.delete<DeleteMessageResponse>(
    `/conversations/${id}/messages/${messageId}`,
    config,
  );

export const editMessage = ({ content, id, messageId }: EditMessagePayload) =>
  axiosClient.patch<MessageType>(
    `/conversations/${id}/messages/${messageId}`,
    { content },
    config,
  );
