import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@-store";
import { MessageItemContentStyle } from "@-styles";
import { GroupMessageType, MessageType } from "@-utils/types";

import { MessageItemAttachmentContainer } from "./attachments/MessageItemAttachmentContainer";
import { EditMessageContainer } from "./EditMessageContainer";

type Props = {
  message: MessageType | GroupMessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  padding: string;
};

export const MessageItemContainerBody: FC<Props> = ({
  message,
  onEditMessageChange,
  padding,
}) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer,
  );
  return (
    <>
      {isEditingMessage && message.id === messageBeingEdited?.id ? (
        <MessageItemContentStyle padding={padding}>
          <EditMessageContainer onEditMessageChange={onEditMessageChange} />
        </MessageItemContentStyle>
      ) : (
        <MessageItemContentStyle padding={padding}>
          {message.content || null}
          <MessageItemAttachmentContainer message={message} />
        </MessageItemContentStyle>
      )}
    </>
  );
};
