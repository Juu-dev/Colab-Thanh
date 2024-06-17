// @collapses
import styled from "styled-components";

export const VideoContainerItemStyle = styled.div`
  width: 400px;
  height: 400px;
  & video {
    width: 400px;
    height: 400px;
    pointer-events: none;
  }
`;

export const VideoContainerActionButtonsStyle = styled.div`
  display: flex;
  gap: 10px;
  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    font-size: 32px;
    padding: 18px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const MiniVideoStyle = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 300px;
  width: 400px;
  z-index: 99;
  & video {
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
`;
