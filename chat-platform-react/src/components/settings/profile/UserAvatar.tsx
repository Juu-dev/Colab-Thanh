import { Dispatch, FC, SetStateAction, useRef } from "react";

import { FileInputStyle, UserAvatarContainerStyle } from "@-styles";
import { DivMouseEvent, InputChangeEvent } from "@-utils/types";

type Props = {
  avatarSource: string;
  avatarSourceCopy: string;
  setAvatarSourceCopy: Dispatch<SetStateAction<string>>;
  setAvatarFile: Dispatch<SetStateAction<File | undefined>>;
};

export const UserAvatar: FC<Props> = ({
  avatarSource,
  avatarSourceCopy,
  setAvatarSourceCopy,
  setAvatarFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onAvatarClick = (e: DivMouseEvent) => fileInputRef.current?.click();

  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setAvatarSourceCopy(file ? URL.createObjectURL(file) : avatarSource);
    setAvatarFile(file || undefined);
  };

  return (
    <>
      <UserAvatarContainerStyle
        onClick={onAvatarClick}
        url={avatarSourceCopy}
      />
      <FileInputStyle
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />
    </>
  );
};
