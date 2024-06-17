import { FC } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, removeAttachment } from "@-store";
import {
  MessageAttachmentContainerStyle,
  MessageAttachmentStyle,
} from "@-styles";
import { Attachment } from "@-utils/types";

import { MessageImageCanvas } from "./MessageImageCanvas";

export const MessageAttachmentContainer: FC = () => {
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const dispatch = useDispatch<AppDispatch>();

  const onDeleteAttachment = (attachment: Attachment) => {
    dispatch(removeAttachment(attachment));
  };

  return (
    <MessageAttachmentContainerStyle>
      {attachments.map((attachment) => (
        <MessageAttachmentStyle
          key={attachment.id}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MessageImageCanvas file={attachment.file} />
          <RiDeleteBin6Fill
            color="red"
            style={{ position: "absolute", zIndex: 1, right: 15, top: 10 }}
            size={30}
            onClick={() => onDeleteAttachment(attachment)}
          />
          <div>{attachment.file.name}</div>
        </MessageAttachmentStyle>
      ))}
    </MessageAttachmentContainerStyle>
  );
};
