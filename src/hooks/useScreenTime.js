import { useState, useMemo } from "react";
import { getTodayKey } from "../utils/dateUtils.js";
import { useLocalStorage } from "./useLocalStorage.js";

function generate() {
  return {
    youtube: +(3 + Math.random() * 4).toFixed(1),
    instagram: +(1 + Math.random() * 3).toFixed(1),
    vscode: +(1 + Math.random() * 2).toFixed(1),
    whatsapp: +(0.5 + Math.random() * 1.5).toFixed(1),
  };
}

export function useScreenTime() {
  const today = useMemo(() => getTodayKey(), []);
  const [dateKey, setDateKey] = useLocalStorage("lifecards_screen_time_date", "");
  const [data, setData] = useLocalStorage("lifecards_screen_time", null);

  const screenTime = useMemo(() => {
    if (dateKey === today && data) return data;
    const fresh = generate();
    setDateKey(today);
    setData(fresh);
    return fresh;
  }, [today, dateKey, data, setDateKey, setData]);

  const total = useMemo(
    () => Object.values(screenTime).reduce((s, v) => s + v, 0),
    [screenTime]
  );

  return { screenTime, total };
}
