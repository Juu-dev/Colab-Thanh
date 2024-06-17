// @collapses
import styled, { css } from "styled-components";

export const UploadAvatarButtonStyle = styled.div`
  width: 100%;
  background-color: #202020;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  height: 60px;
  cursor: pointer;
`;

export const UploadedAvatarContainerStyle = styled.div`
  width: 100%;
  background-color: #101010;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  height: 100px;
  justify-content: space-between;
  border-radius: 4px;
  margin-bottom: 10px;
  & .side {
    display: flex;
    align-items: center;
    gap: 20px;
    & .fileName {
      display: inline-block;
      word-break: break-word;
    }
  }
`;

export const AvatarUploadContainerStyle = styled.div<{ url?: string }>`
  height: 150px;
  width: 150px;
  border-radius: 100%;
  border: 4px solid #afafaf;
  cursor: pointer;
  ${({ url }) =>
    url
      ? css`
          transition: 1s background ease;
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url('${url}') no-repeat center;
          opacity: 100%;
          transition: 300ms opacity ease;
          background-size: cover;
          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `};
  &::before {
    background-color: none;
    content: 'Change Avatar';
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f1f1f1;
    font-size: 15px;
    font-weight: 500;
    opacity: 0;
    transition: 300ms opacity ease;
  }
  &:hover:before {
    opacity: 1;
  }
`;

export const UploadedAvatarStyle = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;
