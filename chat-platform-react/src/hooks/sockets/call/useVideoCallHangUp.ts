import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, resetState } from "@-store";
import { useSocketContext } from "@-utils/context";

export function useVideoCallHangUp() {
  const socket = useSocketContext();

  const dispatch = useDispatch<AppDispatch>();

  const { call, connection, localStream, remoteStream } = useSelector(
    (state: RootState) => state.call,
  );

  useEffect(() => {
    socket.on("onVideoCallHangUp", () => {
      console.log("received onVideoCallHangUp");
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
      socket.off("onVideoCallHangUp");
    };
  }, [call, remoteStream, localStream, socket, connection, dispatch]);
}
