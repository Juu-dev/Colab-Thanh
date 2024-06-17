import { createRef } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { useKeydown } from "@-hooks";
import { AppDispatch, RootState, setShowEditGroupModal } from "@-store";
import { OverlayStyle } from "@-styles";
import { DivMouseEvent } from "@-utils/types";

import { EditGroupForm } from "../forms/EditGroupForm";

import { ModalContainer, ModalHeader, ModalContentBody } from ".";

export const EditGroupModal = () => {
  const ref = createRef<HTMLDivElement>();
  const dispatch = useDispatch<AppDispatch>();
  const { isSavingChanges } = useSelector((state: RootState) => state.groups);

  const handleOverlayClick = (e: DivMouseEvent) =>
    ref.current &&
    ref.current === e.target &&
    !isSavingChanges &&
    dispatch(setShowEditGroupModal(false));

  useKeydown(
    (e) =>
      e.key === "Escape" &&
      !isSavingChanges &&
      dispatch(setShowEditGroupModal(false)),
  );

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Edit Group</h2>
          <MdClose
            size={32}
            onClick={() =>
              !isSavingChanges && dispatch(setShowEditGroupModal(false))
            }
            cursor={isSavingChanges ? "not-allowed" : "pointer"}
          />
        </ModalHeader>
        <ModalContentBody>
          <EditGroupForm />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
