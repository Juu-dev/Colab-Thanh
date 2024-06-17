import { Dispatch, FC, SetStateAction } from "react";

import {
  InputContainerStyle,
  InputFieldStyle,
  InputLabelStyle,
} from "@-styles";

type Props = {
  setQuery: Dispatch<SetStateAction<string>>;
};

export const GroupRecipientsField: FC<Props> = ({ setQuery }) => {
  return (
    <section>
      <InputContainerStyle backgroundColor="#161616">
        <InputLabelStyle>Recipient</InputLabelStyle>
        <InputFieldStyle onChange={(e) => setQuery(e.target.value)} />
      </InputContainerStyle>
    </section>
  );
};
