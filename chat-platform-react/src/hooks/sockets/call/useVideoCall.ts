import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppDispatch,
  RootState,
  setCaller,
  setReceiver,
  setIsReceivingCall,
  setCallType,
} from "@-store";
import { useAuthContext, useSocketContext } from "@-utils/context";
import { CallPayload } from "@-utils/types";

export function useVideoCall() {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useSocketContext();
  const { user } = useAuthContext();

  const { isReceivingCall } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    socket.on("onVideoCall", (data: CallPayload) => {
      console.log("receiving video call....");
      console.log(data);
      if (isReceivingCall) return;
      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user!));
      dispatch(setIsReceivingCall(true));
      dispatch(setCallType("video"));
    });

    return () => {
      socket.off("onVideoCall");
    };
  }, [dispatch, isReceivingCall, socket, user]);
}
