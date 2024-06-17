import { useEffect, useState } from "react";

import { getAuthUser } from "@-utils/api";
import { useAuthContext } from "@-utils/context";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useAuthContext();

  useEffect(() => {
    const controller = new AbortController();
    getAuthUser()
      .then(({ data }) => {
        console.log(data);
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => setLoading(false), 1000);
      });

    return () => {
      controller.abort();
    };
  }, [updateAuthUser]);

  return { user, loading };
}
