import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { useToast } from "@-hooks";
import { AppDispatch, createFriendRequestThunk } from "@-store";
import {
  ButtonStyle,
  InputContainerStyle,
  InputFieldStyle,
  InputLabelStyle,
} from "@-styles";

import styles from "./index.module.scss";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const SendFriendRequestForm: FC<Props> = ({ setShowModal }) => {
  const [username, setUsername] = useState("");
  const { success, error } = useToast({ theme: "dark" });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createFriendRequestThunk(username))
      .unwrap()
      .then(() => {
        console.log("Success Friend Request");
        setShowModal(false);
        success("Friend Request Sent!");
      })
      .catch((err) => {
        console.log(err);
        error("Error sending friend request");
      });
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainerStyle backgroundColor="#161616">
        <InputLabelStyle>Recipient</InputLabelStyle>
        <InputFieldStyle
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainerStyle>
      <ButtonStyle style={{ margin: "10px 0" }} disabled={!username}>
        Send
      </ButtonStyle>
    </form>
  );
};
