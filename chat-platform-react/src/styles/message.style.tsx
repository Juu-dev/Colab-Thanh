// @collapses
import { CharacterLimitProps, MessageInputContainerProps, MessageItemContentProps } from "@-styles/styleTypes";
import styled from "styled-components";

export const MessagePanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.messagePanel.backgroundColor};
`;

export const MessagePanelHeaderStyle = styled.header`
  height: 90px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.messagePanel.header.title};
`;

export const MessagePanelBodyStyle = styled.div`
  padding: 32px 32px 0 32px;
  padding-top: 0;
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  height: calc(100% - 600px);
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.background.primary};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.background.secondary};
    width: 5px;
    border-radius: 20px;
  }
`;

export const MessageInputContainerStyle = styled.div<MessageInputContainerProps>`
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme.messagePanel.inputContainer.backgroundColor};
  border-radius: 5px;
  width: 100%;
  padding: 18px 32px;
  display: flex;
  gap: 20px;
  align-items: ${({ isMultiLine }) => (isMultiLine ? 'top' : 'center')};
  position: relative;
`;

export const MessagePanelFooterStyle = styled.footer`
  padding: 0 32px 10px 32px;
  margin-top: 0;
`;

export const MessageInputStyle = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  color: #454545;
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
`;

export const MessageItemContainerStyle = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
  word-break: break-word;
`;

export const MessageItemDetailsStyle = styled.div`
  flex: 1;
`;

export const MessageItemHeaderContainerStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .time {
    color: #6d6d6d;
    font-size: 14px;
    font-weight: bold;
  }
  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContentStyle = styled.div<MessageItemContentProps>`
  padding: ${({ padding }) => padding};
  width: 100%;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.messagePanel.body.content.color};
`;

export const MessageTypingStatusStyle = styled.div`
  width: 100%;
  font-size: 15px;
  color: ${({ theme }) => theme.text.secondary};
  box-sizing: border-box;
  margin-top: 10px;
  height: 20px;
`;

export const EditMessageInputFieldStyle = styled.input`
  outline: none;
  border: none;
  background-color: #222;
  color: #bababa;
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 15px;
  padding: 18px 22px;
  border-radius: 5px;
  margin: 4px 0;
  width: 100%;
`;

export const EditMessageActionsContainerStyle = styled.div`
  font-size: 12px;
  & span {
    color: #1d77ff;
  }
`;

export const MessagePanelHeaderIconsStyle = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;


export const MessageAttachmentContainerStyle = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  margin: 10px 0;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #101010;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #1c1c1c;
    border-radius: 5px;
  }
`;

export const MessageAttachmentStyle = styled.div`
  box-sizing: border-box;
  padding: 50px 0 0 0;
  position: relative;
  max-height: 300px;
  height: 300px;
  background-color: #161616;
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

export const SystemMessageContainerStyle = styled.div`
  width: 80%;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: #1c1c1c;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  & .header {
    display: flex;
    align-items: center;
    gap: 10px;
    & .icon {
      font-size: 20px;
    }
    & span {
      font-weight: bold;
    }
  }
  & .content {
    font-size: 14px;
    font-style: italic;
    padding-left: 28px;
    color: #656565;
  }
`;

export const CharacterLimitStyle = styled.span<CharacterLimitProps>`
  position: absolute;
  bottom: 8px;
  right: 36px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ atMaxLength }) =>
    atMaxLength ? '#ff0000' : 'rgb(129, 129, 129)'};
`;

