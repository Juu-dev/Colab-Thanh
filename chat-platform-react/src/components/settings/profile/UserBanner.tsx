import { FC, useRef, Dispatch, SetStateAction } from "react";

import { FileInputStyle, SettingsProfileBannerStyle } from "@-styles";
import { DivMouseEvent, InputChangeEvent } from "@-utils/types";

type Props = {
  bannerSource: string;
  bannerSourceCopy: string;
  setBannerSourceCopy: Dispatch<SetStateAction<string>>;
  setBannerFile: Dispatch<SetStateAction<File | undefined>>;
};

export const UserBanner: FC<Props> = ({
  bannerSource,
  bannerSourceCopy,
  setBannerSourceCopy,
  setBannerFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const onBannerClick = (e: DivMouseEvent) => fileInputRef.current?.click();
  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setBannerSourceCopy(file ? URL.createObjectURL(file) : bannerSource);
    setBannerFile(file || undefined);
  };

  return (
    <>
      <SettingsProfileBannerStyle
        ref={bannerRef}
        onClick={onBannerClick}
        backgroundUrl={bannerSourceCopy}
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
