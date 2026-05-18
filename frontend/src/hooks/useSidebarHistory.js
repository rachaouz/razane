import { useState, useEffect, useCallback } from "react";
import { historyApi }             from "../api/history";
import { formatDate, capitalize } from "../utils/formatUtils";

export function useSidebarHistory(open) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = useCallback(() => {
    setLoading(true);
    historyApi
      .get({ limit: 50 })
      .then((data) => {
        const items = (data.results || []).map((s) => ({
          id:      s.id,
          title:   s.indicator,
          preview: `Score: ${s.risk_score ?? "??"}/100 · ${capitalize(s.risk_level ?? "inconnu")}`,
          date:    formatDate(s.created_at),
          type:    s.ioc_type,
        }));
        setHistory(items);
      })
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!open) return;
    loadHistory();
  }, [open, loadHistory]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await historyApi.delete(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  return { history, loading, handleDelete };
}