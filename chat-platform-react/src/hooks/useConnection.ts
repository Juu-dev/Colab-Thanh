import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@-store";

export function useConnection() {
  const { connection } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    if (connection) {
      console.log("connection is defined....");
      if (connection) {
        console.log("connection is defined...");
        connection.on("open", () => {
          console.log("connection was opened");
        });
        connection.on("error", () => {
          console.log("an error has occured");
        });
        connection.on("data", (data) => {
          console.log("data received", data);
        });
        connection.on("close", () => {
          console.log("connection closed");
        });
      }
      return () => {
        connection?.off("open");
        connection?.off("error");
        connection?.off("data");
      };
    }
  }, [connection]);
}
