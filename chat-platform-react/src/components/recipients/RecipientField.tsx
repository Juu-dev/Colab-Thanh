import { FC, Dispatch, SetStateAction } from "react";

import {
  InputContainerStyle,
  InputLabelStyle,
  InputFieldStyle,
} from "@-styles";
import { User } from "@-utils/types";

import { SelectedRecipientChip } from "./SelectedRecipientChip";

type Props = {
  selectedUser: User | undefined;
  setQuery: Dispatch<SetStateAction<string>>;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};

export const RecipientField: FC<Props> = ({
  selectedUser,
  setQuery,
  setSelectedUser,
}) => (
  <section>
    <InputContainerStyle backgroundColor="#161616">
      <InputLabelStyle>Recipient</InputLabelStyle>
      {selectedUser ? (
        <SelectedRecipientChip
          user={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <InputFieldStyle onChange={(e) => setQuery(e.target.value)} />
      )}
    </InputContainerStyle>
  </section>
);
