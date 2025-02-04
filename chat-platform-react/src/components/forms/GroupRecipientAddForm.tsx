import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useToast } from "@-hooks";
import {
  ButtonStyle,
  InputContainerStyle,
  InputFieldStyle,
  InputLabelStyle,
} from "@-styles";
import { addGroupRecipient } from "@-utils/api";

import styles from "./index.module.scss";

export const GroupRecipientAddForm = () => {
  const { id: groupId } = useParams();
  const [username, setUsername] = useState("");
  const { success, error } = useToast({ theme: "dark" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGroupRecipient({ id: parseInt(groupId!), username })
      .then(({ data }) => {
        console.log(data);
        success("Recipient Added to Group");
        setUsername("");
      })
      .catch((err) => {
        console.log(err);
        error("Failed to add user");
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
        Add Recipient
      </ButtonStyle>
    </form>
  );
};
