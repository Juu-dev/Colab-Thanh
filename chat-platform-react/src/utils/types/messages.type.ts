import { Conversation } from "./conversations.type";
import { User } from "./users.type";

export type ConversationType = "group" | "private";

export type DeleteMessageParams = {
  id: number;
  messageId: number;
};

export type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};

export type EditMessagePayload = {
  id: number;
  messageId: number;
  content: string;
};

export type MessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
  attachments?: MessageAttachment[];
};

export type MessageAttachment = {
  key: string;
};
