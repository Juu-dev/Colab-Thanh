import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState, updateType } from "@-store";
import {
  ConversationSelectedItemStyle,
  ConversationSelectedStyle,
} from "@-styles";
import { chatTypes } from "@-utils/constants";
import { ConversationTypeData } from "@-utils/types";

export const ConversationSelected = () => {
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onSelectType = (chat: ConversationTypeData) => {
    dispatch(updateType(chat.type));
    if (chat.type === "group") navigate("/groups");
    else navigate("/conversations");
  };
  return (
    <ConversationSelectedStyle>
      {chatTypes.map((chat) => (
        <ConversationSelectedItemStyle
          selected={chat.type === selectedType}
          key={chat.type}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </ConversationSelectedItemStyle>
      ))}
    </ConversationSelectedStyle>
  );
};
