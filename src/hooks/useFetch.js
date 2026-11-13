// NOTES: Fetches data from a URL. Gives back data, loading and error. Usage: const { data, loading, error } = useFetch(url)

import { useState, useEffect } from "react";

// Generic data-fetching hook.
// Pass a URL to fetch it, or null/undefined to skip fetching.
// Returns { data, loading, error }.
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Lets us cancel the request if the URL changes or the component unmounts,
    // so an old response can never overwrite newer data.
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed (status ${response.status})`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name === "AbortError") return; // cancelled on purpose, not an error
        setError(err.message || "Something went wrong");
        setData(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
