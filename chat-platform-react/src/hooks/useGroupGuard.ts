import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchGroupById } from "@-utils/api";

export function useGroupGuard() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    console.log("Fetching Group");
    setLoading(true);

    fetchGroupById(parseInt(id!))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [id]);

  return { loading, error };
}
