import { useEffect, useState } from "react";

export default function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getData() {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json?.data || json); // Noroff API bruker {data: []}
      } catch (e) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, isLoading, isError };
}
