import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { CallReceiveDialog } from "@-components/calls/CallReceiveDialog";
import { UserSidebar } from "@-components/sidebars/user/UserSidebar";
import {
  useVideoCallRejected,
  useVideoCallHangUp,
  useVideoCallAccept,
  useVideoCall,
  useVoiceCall,
  useVoiceCallAccepted,
  useVoiceCallHangUp,
  useVoiceCallRejected,
  useFriendRequestReceived,
  useFriendRequestReceiving,
  useConnection,
  useIncomingCall,
  useRemoteStream,
} from "@-hooks";
import { usePeer } from "@-hooks/usePeer";
import { AppDispatch, RootState, fetchFriendRequestThunk } from "@-store";
import { LayoutPageStyle } from "@-styles";
import { DarkTheme, LightTheme } from "@-utils/themes";
import { SelectableTheme } from "@-utils/types";

export const AppPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isReceivingCall, caller } = useSelector(
    (state: RootState) => state.call,
  );

  const { theme } = useSelector((state: RootState) => state.settings);
  const storageTheme = localStorage.getItem("theme") as SelectableTheme;

  // effect: fetch friend requests when the app starts
  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

  // effect: create peer connection at the start of the app
  usePeer();

  useFriendRequestReceived();
  useVideoCall();
  useFriendRequestReceiving();

  /**
   * This useEffect hook is for the user who is receiving the call.
   * So we must dispatch the appropriate actions to set the state
   * for the user receiving the call.
   *
   * The user who is calling will have its own instance of MediaConnection/Call
   */
  // effect: handle the incoming call
  useIncomingCall();

  // effect: handle the remote stream
  useRemoteStream();

  useVideoCallAccept();
  useVideoCallRejected();
  useVideoCallHangUp();
  useVoiceCall();
  useVoiceCallAccepted();
  useVoiceCallHangUp();
  useVoiceCallRejected();

  // effect: handle data connection
  useConnection();

  return (
    <ThemeProvider
      theme={
        storageTheme
          ? storageTheme === "dark"
            ? DarkTheme
            : LightTheme
          : theme === "dark"
            ? DarkTheme
            : LightTheme
      }
    >
      {isReceivingCall && caller && <CallReceiveDialog />}
      <LayoutPageStyle>
        <UserSidebar />
        <Outlet />
      </LayoutPageStyle>
    </ThemeProvider>
  );
};
