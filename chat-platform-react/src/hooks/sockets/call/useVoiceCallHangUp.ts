import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, resetState } from "@-store";
import { WebsocketEvents } from "@-utils/constants";
import { useSocketContext } from "@-utils/context";

export function useVoiceCallHangUp() {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useSocketContext();

  const { call, connection, localStream, remoteStream } = useSelector(
    (state: RootState) => state.call,
  );

  useEffect(() => {
    socket.on(WebsocketEvents.VOICE_CALL_HANG_UP, () => {
      console.log("received onVoiceCallHangUp");
      localStream &&
        localStream.getTracks().forEach((track) => {
          console.log(localStream.id);
          console.log("stopping local track: ", track);
          track.stop();
        });
      console.log(remoteStream);
      remoteStream &&
        remoteStream.getTracks().forEach((track) => {
          console.log(remoteStream.id);
          console.log("stopping remote track", track);
          track.stop();
        });
      call && call.close();
      connection && connection.close();
      dispatch(resetState());
    });

    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_HANG_UP);
    };
  }, [call, remoteStream, localStream, socket, connection, dispatch]);
}
