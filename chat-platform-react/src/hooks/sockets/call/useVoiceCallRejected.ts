import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch, resetState } from "@-store";
import { WebsocketEvents } from "@-utils/constants";
import { useSocketContext } from "@-utils/context";

export function useVoiceCallRejected() {
  const socket = useSocketContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on(WebsocketEvents.VOICE_CALL_REJECTED, (data) => {
      console.log("receiver rejected the voice call ", data.receiver);
      dispatch(resetState());
    });

    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_REJECTED);
    };
  }, [dispatch, socket]);
}
