import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch, resetState } from "@-store";
import { WebsocketEvents } from "@-utils/constants";
import { useSocketContext } from "@-utils/context";

export function useVideoCallRejected() {
  const socket = useSocketContext();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on(WebsocketEvents.VIDEO_CALL_REJECTED, (data) => {
      console.log("receiver rejected the call ", data.receiver);
      dispatch(resetState());
    });

    return () => {
      socket.off(WebsocketEvents.VIDEO_CALL_REJECTED);
    };
  }, [dispatch, socket]);
}
