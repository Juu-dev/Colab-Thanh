import { MessageType } from "./messages.type";
import { User } from "./users.type";

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
};

export type CreateConversationParams = {
  username: string;
  message: string;
};

export type FetchMessagePayload = {
  id: number;
  messages: MessageType[];
};
