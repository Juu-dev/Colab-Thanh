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
import { ReceiverEvents } from "@-utils/constants";
import { useAuthContext, useSocketContext } from "@-utils/context";
import { CallPayload } from "@-utils/types";

export function useVoiceCall() {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useSocketContext();
  const { user } = useAuthContext();

  const { isReceivingCall } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    socket.on(ReceiverEvents.VOICE_CALL, (data: CallPayload) => {
      console.log("receiving voice call....");
      console.log(data);
      if (isReceivingCall) return;
      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user!));
      dispatch(setIsReceivingCall(true));
      dispatch(setCallType("audio"));
    });

    return () => {
      socket.off(ReceiverEvents.VOICE_CALL);
    };
  }, [dispatch, isReceivingCall, socket, user]);
}
