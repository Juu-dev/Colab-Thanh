// @collapses
import styled, { css } from 'styled-components';
import { slideUp } from './keyframes';
import { UserBannerProps } from './styleTypes';

export const UserAvatarContainerStyle = styled.div<{ url?: string }>`
  height: 150px;
  width: 150px;
  border-radius: 100%;
  border: 4px solid #afafaf;
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
  cursor: pointer;
  &::before {
    background-color: none;
    content: 'Change Avatar';
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b5b5b5;
    font-size: 15px;
    font-weight: 500;
    opacity: 0;
    transition: 300ms opacity ease;
  }
  &:hover:before {
    opacity: 1;
  }
`;

export const SettingsProfileBannerStyle = styled.div<UserBannerProps>`
  width: 100%;
  height: 300px;
  cursor: pointer;
  ${({ backgroundUrl }) =>
    backgroundUrl
      ? css`
          transition: 1s background ease;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url('${backgroundUrl}') no-repeat center;
          opacity: 70%;
          transition: 300ms opacity ease;
          background-size: cover;
          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `}
  &::before {
    background-color: none;
    content: 'Change Banner';
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b5b5b5;
    font-size: 20px;
    font-weight: 500;
    opacity: 0;
    transition: 300ms opacity ease;
  }
  &:hover:before {
    opacity: 1;
  }
`;

export const SettingsProfileUserDetailsStyle = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transform: translateY(-50%);
  & .avatar {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 4px solid #292929;
    background-color: #2a2a2a;
  }

  & span {
    font-size: 24px;
    font-weight: 500;
    position: absolute;
    bottom: 20px;
    left: 190px;
  }
`;

export const ProfileSectionStyle = styled.div`
  padding: 0 48px;
`;

export const ProfileAboutSectionStyle = styled.div`
  background-color: #111111;
  width: 500px;
  padding: 32px;
  box-sizing: border-box;
  border-radius: 8px;
  & label {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ProfileAboutSectionHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileDescriptionFieldStyle = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  color: #ffffff;
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  padding: 0;
  margin-top: 20px;
  resize: none;
  height: 80px;
  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }

  &:disabled {
    color: #484848;
  }
`;

export const ProfileEditActionBarStyle = styled.div`
  background-color: #0e0e0e;
  width: 750px;
  display: flex;
  padding: 14px 24px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: fixed;
  overflow: hidden;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  animation: 500ms ${slideUp} ease;
  animation-fill-mode: forwards;
  border-radius: 8px;
  & .buttons {
    display: flex;
    gap: 10px;
  }
`;

/**
 * ${({ animate }) =>
    animate
      ? css`
          animation: 0s ${slideUp} ease !important;
          animation-fill-mode: forwards;
        `
      : css`
          animation: 500ms ${slideDown} ease;
          animation-fill-mode: forwards;
        `}
 */
