// @collapses
import styled from "styled-components";

export const CallReceiveDialogContainerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  background-color: #1f1f1f;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  z-index: 999999999;
  border-radius: 10px;
  padding: 32px 24px;
  & .content {
    text-align: center;
  }

  & .icons {
    display: flex;
    justify-content: center;
    gap: 10px;
    & div {
      height: 50px;
      width: 50px;
      background-color: #151515;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  & .accept {
    color: #00ff0a;
    font-size: 30px;
  }

  & .reject {
    color: #ff0000;
    font-size: 30px;
  }
`;
