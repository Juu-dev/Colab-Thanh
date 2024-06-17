import { FaceVeryHappy } from "akar-icons";
import { Dispatch, FC, SetStateAction, useState } from "react";

import { CharacterLimitStyle, MessageInputContainerStyle } from "@-styles";

import styles from "./index.module.scss";
import { MessageAttachmentActionIcon } from "./MessageAttachmentActionIcon";
import { MessageTextField } from "../inputs/MessageTextField";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  placeholderName: string;
  sendMessage: () => void;
  sendTypingStatus: () => void;
};

export const MessageInputField: FC<Props> = ({
  content,
  placeholderName,
  setContent,
  sendMessage,
  sendTypingStatus,
}) => {
  const ICON_SIZE = 36;
  const MAX_LENGTH = 2048;
  const [isMultiLine, setIsMultiLine] = useState(false);
  const atMaxLength = content.length === MAX_LENGTH;

  return (
    <>
      <MessageInputContainerStyle isMultiLine={isMultiLine}>
        <MessageAttachmentActionIcon />
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          />
        </form>
        <FaceVeryHappy className={styles.icon} size={ICON_SIZE} />
        {atMaxLength && (
          <CharacterLimitStyle atMaxLength={atMaxLength}>
            {`${content.length}/${MAX_LENGTH}`}
          </CharacterLimitStyle>
        )}
      </MessageInputContainerStyle>
    </>
  );
};
