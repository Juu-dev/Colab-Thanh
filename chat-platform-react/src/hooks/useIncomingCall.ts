import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, setCall, setLocalStream } from "@-store";

export function useIncomingCall() {
  const { peer, callType } = useSelector((state: RootState) => state.call);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!peer) return;
    peer.on("call", async (incomingCall) => {
      console.log("Incoming Call!!!!!");
      console.log(callType);
      const constraints = { video: callType === "video", audio: true };
      console.log(constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Receiving Call & Got Local Stream:", stream.id);
      incomingCall.answer(stream);
      dispatch(setLocalStream(stream));
      dispatch(setCall(incomingCall));
    });
    return () => {
      peer.off("call");
    };
  }, [peer, callType, dispatch]);
}
