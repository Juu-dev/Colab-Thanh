import { Dispatch, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "@-hooks";
import { AppDispatch, createGroupThunk } from "@-store";
import {
  InputContainerStyle,
  InputLabelStyle,
  TextFieldStyle,
  ButtonStyle,
  RecipientChipContainerStyle,
  InputFieldStyle,
} from "@-styles";
import { searchUsers } from "@-utils/api";
import { User } from "@-utils/types";

import styles from "./index.module.scss";
import { GroupRecipientsField } from "../recipients/GroupRecipientsField";
import { RecipientResultContainer } from "../recipients/RecipientResultContainer";
import { SelectedGroupRecipientChip } from "../recipients/SelectedGroupRecipientChip";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateGroupForm: FC<Props> = ({ setShowModal }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          console.log(data);
          setResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRecipients.length === 0 || !message || !title) return;
    const users = selectedRecipients.map((user) => user.username);
    return dispatch(createGroupThunk({ title, users }))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        console.log("done");
        setShowModal(false);
        navigate(`/groups/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleUserSelect = (user: User) => {
    const exists = selectedRecipients.find((u) => u.id === user.id);
    if (!exists) setSelectedRecipients((prev) => [...prev, user]);
  };

  const removeUser = (user: User) =>
    setSelectedRecipients((prev) => prev.filter((u) => u.id !== user.id));

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientChipContainerStyle>
        {selectedRecipients.map((user) => (
          <SelectedGroupRecipientChip user={user} removeUser={removeUser} />
        ))}
      </RecipientChipContainerStyle>
      <GroupRecipientsField setQuery={setQuery} />
      {results.length > 0 && query && (
        <RecipientResultContainer
          userResults={results}
          handleUserSelect={handleUserSelect}
        />
      )}
      <section className={styles.message}>
        <InputContainerStyle backgroundColor="#161616">
          <InputLabelStyle>Title</InputLabelStyle>
          <InputFieldStyle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainerStyle>
      </section>
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
