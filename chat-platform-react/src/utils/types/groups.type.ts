import { MessageAttachment, MessageType } from "./messages.type";
import { User } from "./users.type";

export type Group = {
  id: number;
  title?: string;
  users: User[];
  creator: User;
  owner: User;
  messages: GroupMessageType[];
  createdAt: number;
  lastMessageSent: MessageType;
  lastMessageSentAt: Date;
  avatar?: string;
};
export type AddGroupRecipientParams = {
  id: number;
  username: string;
};

export type CreateGroupParams = {
  users: string[];
  title: string;
};

export type CreateMessageParams = {
  id: number;
  content: string;
};

export type DeleteGroupMessageParams = {
  id: number;
  messageId: number;
};

export type DeleteGroupMessageResponse = {
  groupId: number;
  messageId: number;
};

export type FetchGroupMessagePayload = {
  id: number;
  messages: GroupMessageType[];
};

export type GroupMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  group: Group;
  attachments?: MessageAttachment[];
};

export type RemoveGroupRecipientParams = {
  id: number;
  userId: number;
};

export type UpdateGroupDetailsPayload = {
  id: number;
  data: FormData;
};

export type UpdateGroupOwnerParams = {
  id: number;
  newOwnerId: number;
};
