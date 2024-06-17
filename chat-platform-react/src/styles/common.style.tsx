// @collapses
import styled from "styled-components";
import { PageProps, FlexProps } from './styleTypes';

export const FlexStyle = styled.div<FlexProps>`
  display: flex;
  width: 100%;
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000e3;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ScrollableContainerStyle = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FormStyle = styled.form`
  width: 100%;
`;

export const IconBadgeStyle = styled.div`
  background-color: #ff3535;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageStyle = styled.div<PageProps>`
  background-color: #1a1a1a;
  height: 100%;
  width: 100%;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  overflow: hidden;
`;

export const LayoutPageStyle = styled.div`
  height: 100%;
  display: flex;
`;