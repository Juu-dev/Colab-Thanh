// @collapses
import { ContextMenuProps } from "@-styles/styleTypes";
import styled, { css } from "styled-components";

export const ContextMenuStyle = styled.ul<ContextMenuProps>`
  border-radius: 8px;
  box-sizing: border-box;
  position: fixed;
  width: 220px;
  background-color: #1a1a1a;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}
  list-style-type: none;
  margin: 0;
  padding: 10px;
  z-index: 99;
`;

export const ContextMenuItemStyle = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  margin: 6px 0;
  &:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
`;

export const TestContextMenuStyle = styled.div<ContextMenuProps>`
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}

  width: 200px;
  background-color: #000;
`;