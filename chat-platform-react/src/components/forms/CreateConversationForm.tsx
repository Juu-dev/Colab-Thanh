import React, { Dispatch, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "@-hooks";
import { AppDispatch, createConversationThunk } from "@-store";
import {
  ButtonStyle,
  InputContainerStyle,
  InputLabelStyle,
  TextFieldStyle,
} from "@-styles";
import { searchUsers } from "@-utils/api";
import { User } from "@-utils/types";

import styles from "./index.module.scss";
import { RecipientField } from "../recipients/RecipientField";
import { RecipientResultContainer } from "../recipients/RecipientResultContainer";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {
  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");
  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          console.log(data);
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !selectedUser) return;
    return dispatch(
      createConversationThunk({ username: selectedUser.username, message }),
    )
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        console.log("done");
        setShowModal(false);
        navigate(`/conversations/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setUserResults([]);
    setQuery("");
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientField
        selectedUser={selectedUser}
        setQuery={setQuery}
        setSelectedUser={setSelectedUser}
      />
      {!selectedUser && userResults.length > 0 && query && (
        <RecipientResultContainer
          userResults={userResults}
          handleUserSelect={handleUserSelect}
        />
      )}
      <section className={styles.message}>
        <InputContainerStyle backgroundColor="#161616">
          <InputLabelStyle>Message (optional)</InputLabelStyle>
          <TextFieldStyle
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainerStyle>
      </section>
      <ButtonStyle>Create Conversation</ButtonStyle>
    </form>
  );
};
