import { useState, useContext, Dispatch, SetStateAction, FC } from "react";

import { useToast } from "@-hooks";
import {
  InputContainerStyle,
  InputContainerHeaderStyle,
  InputFieldStyle,
  InputLabelStyle,
  DynamicButtonStyle,
} from "@-styles";
import { updateStatusMessage } from "@-utils/api";
import { AuthContext } from "@-utils/context";

import styles from "../index.module.scss";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const UpdateUserStatusForm: FC<Props> = ({ setShowModal }) => {
  const { user } = useContext(AuthContext);
  const { success, error } = useToast({ theme: "dark" });
  const [statusMessage, setStatusMessage] = useState(
    user?.presence?.statusMessage || "",
  );

  const saveStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updating Status...");
    updateStatusMessage({ statusMessage })
      .then(() => {
        success("Updated Status!");
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        error("Failed to Update Status");
      });
  };

  return (
    <form className={styles.updateUserStatusForm} onSubmit={saveStatus}>
      <InputContainerStyle backgroundColor="#0A0A0A">
        <InputContainerHeaderStyle>
          <InputLabelStyle htmlFor="message">Message</InputLabelStyle>
        </InputContainerHeaderStyle>
        <InputFieldStyle
          type="test"
          id="message"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />
      </InputContainerStyle>
      <div className={styles.updateStatusFormButtons}>
        <DynamicButtonStyle size="md">Save</DynamicButtonStyle>
      </div>
    </form>
  );
};
