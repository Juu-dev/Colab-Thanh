// @collapses
import styled from "styled-components";

export const GroupRecipientsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 350px;
  background-color: ${({ theme }) => theme.background.secondary};
  flex: 0 0 auto;
`;

export const GroupRecipientsSidebarHeaderStyle = styled.div`
  height: 90px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  gap: 20px;
  & span {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const GroupRecipientSidebarItemContainerStyle = styled.div`
  color: ${({ theme }) => theme.text.primary};
  padding: 30px 0 0 30px;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

type GroupRecipientSidebarItemProps = {
  online: boolean;
};

export const GroupRecipientSidebarItemStyle = styled.div<GroupRecipientSidebarItemProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
  & .recipientDetails {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text.secondary};
  }
  & .left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  & .status {
    font-size: 12px;
    font-weight: 500;
    color: #929292;
  }
  opacity: ${({ online }) => !online && 0.2};
`;

export const GroupHeaderIconsStyle = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const GroupAvatarUploadContainerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;