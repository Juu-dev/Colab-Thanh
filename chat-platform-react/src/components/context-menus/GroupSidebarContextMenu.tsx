import { Edit } from "akar-icons";
import { FC, useContext } from "react";
import { IoMdExit, IoIosArchive } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  AppDispatch,
  RootState,
  setShowEditGroupModal,
  toggleGroupContextMenu,
  selectGroupById,
  leaveGroupThunk,
} from "@-store";
import { ContextMenuStyle, ContextMenuItemStyle } from "@-styles";
import { AuthContext } from "@-utils/context";

export const GroupSidebarContextMenu: FC = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector((state: RootState) => state.groups.points);

  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!)),
  );

  const contextMenuGroup = useSelector(
    (state: RootState) => state.groups.selectedGroupContextMenu,
  );

  const leaveGroup = () => {
    if (!contextMenuGroup) return;
    dispatch(leaveGroupThunk(contextMenuGroup.id)).finally(() =>
      dispatch(toggleGroupContextMenu(false)),
    );
  };

  return (
    <ContextMenuStyle top={points.y} left={points.x}>
      <ContextMenuItemStyle onClick={leaveGroup}>
        <IoMdExit size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Leave Group</span>
      </ContextMenuItemStyle>
      {user?.id === contextMenuGroup?.owner.id && (
        <ContextMenuItemStyle
          onClick={() => dispatch(setShowEditGroupModal(true))}
        >
          <Edit size={20} color="#fff" />
          <span style={{ color: "#fff" }}>Edit Group</span>
        </ContextMenuItemStyle>
      )}
      <ContextMenuItemStyle>
        <IoIosArchive size={20} color="#fff" />
        <span style={{ color: "#fff" }}>Archive Group</span>
      </ContextMenuItemStyle>
    </ContextMenuStyle>
  );
};
