# API Logic

## Auth
- [Post:register] 
- [Post:login]
- [Get:status]
- [Post:logout]

## User
- [Get:search] => search user with query => [OK]
- [Get:check] => check username => [OK]

## User profile
- [Patch:] => create or update user profile =>  [OK]

## User presence
- [Patch:status] => change status presence of user =>  [OK]

## Friend
- [Get:] => Get list friend by querying with condition sender or receiver is id of user => [OK]
- [Delete:id/delete] => Delete friend by [idFriend, idCurrentUser] and **EMIT** `friend.removed` => [OK]

## Friend Request ---@Throttle---
- [Post:] => Create friend request and **EMIT** `friendrequest.create` => [OK]
- [Patch:id/accept] => Accept friend request, create friend and **EMIT** `onFriendRequestAccepted` => [OK]
- [Delete:id/cancel] => Cancel friend request and **EMIT** `friendrequest.cancel` => [OK]
- [Patch:id/reject] => Reject friend request and **EMIT** `friendrequest.rejected` => [OK]

## Exists
- [Get:conversations/:recipientId] => Check conversation exist or create new conversation and **EMIT** `conversation.create` ????
 
## Conversation
- Middleware: Check permission access to conversation apply for routes `conversations/:id` => [OK]
- [Get:test/endpoint/check] => check endpoint  => 
- [Post:] => Create Conversation with new message => [OK]
- [Get:] => Get list conversation by user id  => [OK]
- [Get:id] => Get conversation by conversation id  => [OK]

## Events
### Friend.event
- [OnEvent:friendrequest.create]
- [OnEvent:friendrequest.cancel]
- [OnEvent:friendrequest.accepted]
- [OnEvent:friendrequest.rejected]
### Friend Request.event
- [OnEvent:friend.removed] ???

## Message
- [Post:] => Create message with attachment by conversation id and then update conversation, **EMIT** `message.create` => [OK]
- [Get:] => get message by conversation id => [OK]
- [Delete:messageId] =>  Delete message and **EMIT** `message.delete` => [OK]
- [Patch:messageId] => Edit message and **EMIT** `message.update` => [OK]

<!-- Note: Attachment with upload data to S3 -->

## Group 
Middleware: Check permission access to conversation apply for routes `groups/:id` => [OK]
- [Post:] => Create group and **EMIT** `group.create`
- [Get:] => Get list group by user id
- [Get:id] => Get group by group id
- [Patch:id/owner] => transfer group owner and **EMIT** `group.owner.update`
- [Patch:id/details] => update details (avatar or title)

## Group message
<!-- See message again -->

## Group recipient
- [Post:] => Add new recipient to group and **EMIT** `group.user.add` => [OK]
- [Delete:leave] => Leave group and **EMIT** `group.user.leave` => [OK]
- [Delete:userId] => Remove recipient from group and **EMIT** `group.user.remove` => [OK]

# GATEWAY
- *handleConnection()*: initial user's session with user's socket
- *handleDisconnect()*: remove user's socket from list user's session

## Sessions
- Using Map() to manage [user_id,AuthenticatedSocket]
- *getUserSocket()*: get socket by user's id
- *setUserSocket()*: set session with user's and socket
- *removeUserSocket*: remove user's socket from list user's session
- *getSockets()*: get all map() session

## Event
- [message.create] => After create message, **EMIT** `onMessage` to author and recipient
- [message.delete] => After delete message, **EMIT** `onMessageDelete` to recipient
- [message.update] => After edit message, **EMIT** `onMessageUpdate` to recipient

- [conversation.create] => After create conversation, **EMIT** `onConversation` to recipient

- [group.message.create] => After create group message, **EMIT** `onGroupMessage` to room
- [group.message.update] => After edit group message, **EMIT** `onGroupMessageUpdate` to room

- [group.create] => After create group, **EMIT** `onGroupCreate` to user list
- [group.owner.update] => After change owner, **EMIT** `onGroupOwnerUpdate` to room and check if not in the room, **EMIT** `onGroupOwnerUpdate` to him
- [group.user.add] => After add user to group, **EMIT** `onGroupUserAdd` to roomm and himself
- [group.user.remove] => After remove user from group, **EMIT** `onGroupRecipientRemoved` to room and himself
- [group.user.leave] => After leave group,  **EMIT** `onGroupParticipantLeft` to room and left user


## Socket
- [createMessage] => ???

- [onConversationJoin] => Current user join to room and **EMIT** `userJoin`
- [onConversationLeave] => Current user leave room and **EMIT** `userLeave`

- [getOnlineGroupUsers] => Get list online users in a group by groupId and **EMIT** `onlineGroupUsersReceived`
- [onGroupJoin] => Current user join to room and **EMIT** `userGroupJoin`
- [onGroupLeave] => Current user join to room and **EMIT** `userGroupLeave`

- [onTypingStart] => Current user **EMIT** `onTypingStart` to conversation
- [onTypingStop] => Current user **EMIT** `onTypingStop` to conversation

- [getOnlineFriends] => Get online friend and **EMIT** `getOnlineFriends` to conversation

- [onVideoCallInitiate] => if receiver is available, **EMIT** `onUserUnavailable`, Otherwise **EMIT** `onVideoCall`
- [videoCallAccepted] => **EMIT** `onVideoCallAccept` to both of you
- [onVideoCallRejected] => **EMIT** `onVideoCallRejected` to both of you
- [videoCallHangUp] => **EMIT** `onVideoCallHangUp` to both of you

- [onVoiceCallInitiate] => if receiver is available, **EMIT** `onUserUnavailable`, Otherwise **EMIT** `onVoiceCall`
- [onVoiceCallAccepted] => **EMIT** `onVoiceCallAccepted` to both of you
- [onVoiceCallRejected] => **EMIT** `onVoiceCallRejected` to both of you
- [onVoiceCallHangUp] => **EMIT** `onVoiceCallHangUp` to both of you

# DATABASE

## BaseMessage
- id: number;
- content: string;
- createdAt: number;
- author: User;

## Conversation
- id: number;
- creator: User;
- recipient: User;
- messages: Message[];
- createdAt: number;
- lastMessageSent: Message;
- lastMessageSentAt: Date;

## Friend
- id: number;
- sender: User;
- receiver: User;
- createdAt: number;

## FriendRequest
- id: number;
- sender: User;
- receiver: User;
- createdAt: number;
- status: FriendRequestStatus;

## Group
- id: number;
- title?: string;
- users: User[];
- creator: User;
- owner: User;
- messages: GroupMessage[];
- createdAt: number;
- lastMessageSent: GroupMessage;
- lastMessageSentAt: Date;
- avatar?: string;

## GroupMessage
- id: number;
- content: string;
- createdAt: number;
- author: User;
- group: Group;
- attachments?: MessageAttachment[];

## GroupMessageAttachment
- key: string;
- message: GroupMessage;

## Message
- id: number;
- content: string;
- createdAt: number;
- author: User;
- conversation: Conversation;
- attachments: MessageAttachment[];

## MessageAttachment
- key: string;
- message: Message;

## UserPresence
- id: number;
- statusMessage?: string;
- showOffline: boolean;

## User
- id: number;
- username: string;
- email: string;
- firstName: string;
- lastName: string;
- password: string;
- messages: Message[];
- groups: Group[];
- profile: Profile;
- presence: UserPresence;
- peer: Peer;

## Session
- expiredAt: number = Date.now();
- id: string;
- json: string;
- destroyedAt: Date;

## Profile
- id: number;
- about?: string;
- avatar?: string;
- banner?: string;
- user: User;

## Peer
- id: string;
- user: User;