import { Conversation } from "./conversations.type";
import { Group, GroupMessageType } from "./groups.type";
import { ConversationType, MessageType } from "./messages.type";
import { User } from "./users.type";

export type MessageEventPayload = {
  message: MessageType;
  conversation: Conversation;
};

export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};

export type GroupMessage = {
  id: number;
  messages: GroupMessageType[];
};

export type MessagePanelBodyProps = {
  isTyping: boolean;
};

export type ConversationTypeData = {
  type: ConversationType;
  label: string;
};

export type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: Group;
};

export type Points = {
  x: number;
  y: number;
};

export type UserContextMenuActionType = "kick" | "transfer_owner" | "profile";
export type ContextMenuItemType = {
  label: string;
  action: UserContextMenuActionType;
  color: string;
  ownerOnly: boolean;
};

export type AddGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type RemoveGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type DivMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type DragEvent = React.DragEvent<HTMLTextAreaElement>;
export type ClipboardEvent = React.ClipboardEvent<HTMLTextAreaElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type FriendRequestStatus = "accepted" | "pending" | "rejected";

export type HandleFriendRequestAction = "accept" | "reject" | "cancel";

export type UserSidebarRouteType =
  | "conversations"
  | "friends"
  | "connections"
  | "settings"
  | "calls";

export type UserSidebarItemType = {
  id: UserSidebarRouteType;
  pathname: string;
};

export type SettingsSidebarRouteType =
  | "profile"
  | "security"
  | "notifications"
  | "integrations"
  | "appearance";

export type SettingsItemType = {
  id: SettingsSidebarRouteType;
  label: string;
  pathname: string;
};

export type RateLimitType = "group" | "private";

export type UpdateRateLimitPayload = {
  type: RateLimitType;
  status: boolean;
};

export type UpdateProfileParams = Partial<{
  about: string;
  avatar: File;
  banner: File;
}>;

export type Attachment = {
  id: number;
  file: File;
};

export type FriendRequestDetailsType = {
  status: string;
  displayName: string;
  user: User;
  incoming: boolean;
};

export type SystemMessageLevel = "info" | "warning" | "error";
export type SystemMessageType = {
  id: number;
  content: string;
  level: SystemMessageLevel;
};

export type SelectableTheme = "dark" | "light";

export type CallPayload = {
  recipientId: number;
  conversationId: number;
  caller: User;
};

export type HandleCallType = "accept" | "reject";

export type AcceptedCallPayload = {
  acceptor: User;
  caller: User;
  conversation: Conversation;
};

export type SetVideoRefPayload = {
  localVideoRef?: React.RefObject<HTMLVideoElement>;
  remoteVideoRef?: React.RefObject<HTMLVideoElement>;
};

export type CallInitiatePayload = {
  localStream: MediaStream;
  isCalling: boolean;
  activeConversationId: number;
  caller: User;
  receiver: User;
  callType: CallType;
};

export type CallType = "video" | "audio";

export enum UpdateGroupAction {
  NEW_MESSAGE = "newMessage",
}

export type UpdateGroupPayload = {
  type?: UpdateGroupAction;
  group: Group;
};

export type GroupParticipantLeftPayload = {
  group: Group;
  userId: number;
};
