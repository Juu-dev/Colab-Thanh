import { AxiosError } from "axios";
import React, { FC, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useToast } from "@-hooks";
import {
  RootState,
  selectConversationById,
  selectGroupById,
  removeAllAttachments,
  addSystemMessage,
  clearAllMessages,
} from "@-store";
import {
  MessagePanelBodyStyle,
  MessagePanelFooterStyle,
  MessagePanelStyle,
  MessageTypingStatusStyle,
} from "@-styles";
import { createMessage } from "@-utils/api";
import { AuthContext } from "@-utils/context";
import { getRecipientFromConversation } from "@-utils/helpers";

import { MessageAttachmentContainer } from "./attachments/MessageAttachmentContainer";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};

export const MessagePanel: FC<Props> = ({
  sendTypingStatus,
  isRecipientTyping,
}) => {
  const toastId = "rateLimitToast";
  const dispatch = useDispatch();
  const { messageCounter } = useSelector(
    (state: RootState) => state.systemMessages,
  );
  const [content, setContent] = useState("");
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const { error } = useToast({ theme: "dark" });
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(routeId!)),
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(routeId!)),
  );
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type,
  );

  const recipient = getRecipientFromConversation(conversation, user);

  useEffect(() => {
    return () => {
      dispatch(clearAllMessages());
      dispatch(removeAllAttachments());
    };
  }, []);

  const sendMessage = async () => {
    const trimmedContent = content.trim();
    if (!routeId) return;
    if (!trimmedContent && !attachments.length) return;
    const formData = new FormData();
    formData.append("id", routeId);
    trimmedContent && formData.append("content", trimmedContent);
    attachments.forEach((attachment) =>
      formData.append("attachments", attachment.file),
    );
    try {
      await createMessage(routeId, selectedType, formData);
      setContent("");
      dispatch(removeAllAttachments());
      dispatch(clearAllMessages());
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 429) {
        error("You are rate limited", { toastId });
        dispatch(
          addSystemMessage({
            id: messageCounter,
            level: "error",
            content: "You are being rate limited. Slow down.",
          }),
        );
      } else if (axiosError.response?.status === 404) {
        dispatch(
          addSystemMessage({
            id: messageCounter,
            level: "error",
            content:
              "The recipient is not in your friends list or they may have blocked you.",
          }),
        );
      }
    }
  };

  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />
        <MessagePanelBodyStyle>
          <MessageContainer />
        </MessagePanelBodyStyle>
        <MessagePanelFooterStyle>
          {attachments.length > 0 && <MessageAttachmentContainer />}
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
            placeholderName={
              selectedType === "group"
                ? group?.title || "Group"
                : recipient?.firstName || "user"
            }
          />
          <MessageTypingStatusStyle>
            {isRecipientTyping ? `${recipient?.firstName} is typing...` : ""}
          </MessageTypingStatusStyle>
        </MessagePanelFooterStyle>
      </MessagePanelStyle>
    </>
  );
};
