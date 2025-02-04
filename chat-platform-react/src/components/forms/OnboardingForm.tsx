import { useRef, useState } from "react";
import { FiFileMinus } from "react-icons/fi";

import {
  FileInputStyle,
  OnboardingAboutFieldStyle,
  OnboardingInputFieldStyle,
  SubmitOnboardingFormButtonStyle,
  UploadAvatarButtonStyle,
  UploadedAvatarStyle,
  UploadedAvatarContainerStyle,
} from "@-styles";
import { completeUserProfile } from "@-utils/api";

import styles from "./index.module.scss";

export const OnboardingForm = () => {
  const [file, setFile] = useState<File>();
  const [source, setSource] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      const file = files.item(0);
      if (file) {
        setSource(URL.createObjectURL(file));
        setFile(file);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target === imageContainerRef.current ||
      e.target === labelRef.current
    ) {
      fileInputRef.current?.click();
    }
  };

  const reset = () => {
    setFile(undefined);
    setSource("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, about);
    console.log(file);
    console.log(source);
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("username", username);
      data.append("about", about);
      console.log(data);
      return completeUserProfile(data)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };

  return (
    <form className={styles.onboardingForm} onSubmit={onSubmit}>
      <div>
        <label className={styles.onboardingLabel} htmlFor="username">
          Username
        </label>
      </div>
      <OnboardingInputFieldStyle
        id="username"
        type="text"
        placeholder="@yourusername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div onClick={handleClick}>
        <label className={styles.onboardingLabel} htmlFor="about">
          About Yourself
        </label>
      </div>
      <OnboardingAboutFieldStyle
        id="about"
        maxLength={200}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      {source && (
        <UploadedAvatarContainerStyle>
          <div className="side">
            <UploadedAvatarStyle src={source} alt="avatar" />
            <div className="fileName">
              asdjhasduiashdjisadgsayhudgaudasdjhasduiashdjisadgsayhudgaud
            </div>
            <FiFileMinus size={40} color="#ff0000" onClick={reset} />
          </div>
        </UploadedAvatarContainerStyle>
      )}
      <UploadAvatarButtonStyle onClick={handleClick} ref={imageContainerRef}>
        <label
          ref={labelRef}
          htmlFor="file"
          onClick={(e) => e.preventDefault()}
        >
          Upload Avatar
        </label>
        <FileInputStyle
          id="file"
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          ref={fileInputRef}
          onChange={onFileChange}
        />
      </UploadAvatarButtonStyle>
      <SubmitOnboardingFormButtonStyle>Submit</SubmitOnboardingFormButtonStyle>
    </form>
  );
};
