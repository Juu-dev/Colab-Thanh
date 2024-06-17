import { FC } from "react";

import {
  RecipientResultContainerStyle,
  RecipientResultItemStyle,
  RecipientScrollableItemContainerStyle,
} from "@-styles";
import { User } from "@-utils/types";

type Props = {
  userResults: User[];
  handleUserSelect: (user: User) => void;
};

export const RecipientResultContainer: FC<Props> = ({
  userResults,
  handleUserSelect,
}) => {
  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainerStyle>
        {userResults.map((user) => (
          <RecipientResultItemStyle
            key={user.id}
            onClick={() => handleUserSelect(user)}
          >
            <span>{user.username}</span>
          </RecipientResultItemStyle>
        ))}
      </RecipientScrollableItemContainerStyle>
    </RecipientResultContainerStyle>
  );
};
