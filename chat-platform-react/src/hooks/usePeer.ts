import Peer from "peerjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch, setPeer } from "@-store";
import { useAuthContext } from "@-utils/context";

export function usePeer() {
  const { user } = useAuthContext();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) return;
    const newPeer = new Peer(user.peer.id, {
      config: {
        iceServers: [
          {
            url: "stun:stun.l.google.com:19302",
          },
          {
            url: "stun:stun1.l.google.com:19302",
          },
        ],
      },
    });
    dispatch(setPeer(newPeer));
  }, []);
}
