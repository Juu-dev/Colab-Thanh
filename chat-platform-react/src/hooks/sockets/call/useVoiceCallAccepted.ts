import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppDispatch,
  RootState,
  setActiveConversationId,
  setCall,
  setConnection,
  setIsCallInProgress,
  setIsReceivingCall,
} from "@-store";
import { WebsocketEvents } from "@-utils/constants";
import { useAuthContext, useSocketContext } from "@-utils/context";
import { AcceptedCallPayload } from "@-utils/types";

export function useVoiceCallAccepted() {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useSocketContext();
  const { user } = useAuthContext();

  const { peer, localStream } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    socket.on(
      WebsocketEvents.VOICE_CALL_ACCEPTED,
      (data: AcceptedCallPayload) => {
        if (!peer) return console.log("AUDIO: No Peer");
        dispatch(setActiveConversationId(data.conversation.id));
        dispatch(setIsCallInProgress(true));
        dispatch(setIsReceivingCall(false));
        if (data.caller.id === user!.id) {
          console.log("AUDIO: connecting to peer now");
          const connection = peer.connect(data.acceptor.peer.id);
          dispatch(setConnection(connection));
          if (!connection) return console.log("No connection");
          if (localStream) {
            console.log("AUDIO: calling peer now");
            const newCall = peer.call(data.acceptor.peer.id, localStream);
            dispatch(setCall(newCall));
          }
        }
      },
    );

    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_ACCEPTED);
    };
  }, [dispatch, localStream, peer, socket, user]);
}
