import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, setRemoteStream } from "@-store";

export function useRemoteStream() {
  const { call } = useSelector((state: RootState) => state.call);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!call) return;
    call.on("stream", (remoteStream) =>
      dispatch(setRemoteStream(remoteStream)),
    );
    call.on("close", () => console.log("call was closed"));
    return () => {
      call.off("stream");
      call.off("close");
    };
  }, [call]);
}
