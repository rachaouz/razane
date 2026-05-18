import { useState, useEffect, useCallback } from "react";
import { historyApi, statsApi } from "../api";

export function useDashboardData() {
  const [scans,   setScans]   = useState([]);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [histRes, statsRes] = await Promise.all([
        historyApi.get({ limit: 100 }),
        statsApi.get(),
      ]);
      setScans(histRes.results || []);
      setStats(statsRes);
    } catch (e) {
      console.error("useDashboardData:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { loading, scans, stats, reload: load };
}