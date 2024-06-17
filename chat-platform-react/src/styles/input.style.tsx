// @collapses
import styled, { css } from "styled-components";

import { InputContainerProps } from "@-styles/styleTypes";

export const InputFieldStyle = styled.input`
  font-family: 'Inter';
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
  &:disabled {
    color: #3b3b3b;
  }
`;

export const InputLabelStyle = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const InputErrorStyle = styled.span`
  color: #ff0000;
  text-transform: uppercase;
  font-size: 11px;
`;

export const OnboardingInputFieldStyle = styled.input`
  background-color: #101010;
  color: #fff;
  outline: none;
  border: none;
  padding: 20px;
  font-family: 'Inter';
  font-size: 16px;
  border-radius: 8px;
  width: 100%;
  margin: 8px 0;
  box-sizing: border-box;
  &::placeholder {
    color: #353535;
    font-style: italic;
  }
`;

export const FileInputStyle = styled.input`
  ${({ type }) =>
    type === 'file' &&
    css`
      display: none;
    `}
`;

export const InputContainerStyle = styled.div<InputContainerProps>`
  background-color: ${(prop) => prop.backgroundColor || '#131313'};
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const InputContainerHeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;