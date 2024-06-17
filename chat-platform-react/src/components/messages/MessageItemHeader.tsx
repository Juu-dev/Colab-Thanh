import { formatRelative } from "date-fns";
import { FC, useContext } from "react";

import { MessageItemHeaderContainerStyle } from "@-styles";
import { AuthContext } from "@-utils/context";
import { GroupMessageType, MessageType } from "@-utils/types";

type Props = {
  message: MessageType | GroupMessageType;
};

export const MessageItemHeader: FC<Props> = ({ message }) => {
  const { user } = useContext(AuthContext);
  return (
    <MessageItemHeaderContainerStyle>
      <span
        className="authorName"
        style={{
          color: user?.id === message.author.id ? "#989898" : "#5E8BFF",
        }}
      >
        {message.author.firstName} {message.author.lastName}
      </span>
      <span className="time">
        {formatRelative(new Date(message.createdAt), new Date())}
      </span>
    </MessageItemHeaderContainerStyle>
  );
};
