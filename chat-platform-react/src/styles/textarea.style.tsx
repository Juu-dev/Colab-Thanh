// @collapses
import styled from 'styled-components';

export const MessageTextareaStyle = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.messagePanel.inputContainer.color};
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
  height: 20px;
  max-height: 200px;
  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const OnboardingAboutFieldStyle = styled.textarea`
  resize: none;
  background-color: #101010;
  color: #fff;
  font-family: 'Inter';
  font-size: 16px;
  border-radius: 8px;
  outline: none;
  border: none;
  padding: 20px;
  width: 100%;
  height: 120px;
  margin: 4px 0;
  box-sizing: border-box;
  &::placeholder {
    color: #353535;
    font-style: italic;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TextFieldStyle = styled.textarea`
  font-family: 'Inter';
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;