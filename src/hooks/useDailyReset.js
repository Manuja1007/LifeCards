import { useEffect, useMemo } from "react";
import { getTodayKey, getYesterdayKey } from "../utils/dateUtils.js";
import { useLocalStorage } from "./useLocalStorage.js";

export function useDailyReset() {
  const today = useMemo(() => getTodayKey(), []);
  const yesterday = useMemo(() => getYesterdayKey(), []);
  const [lastLogin, setLastLogin] = useLocalStorage("lifecards_last_login", "");
  const [showCheckIn, setShowCheckIn] = useLocalStorage("lifecards_show_checkin", false);
  const [timetable] = useLocalStorage("lifecards_timetable", {});

  useEffect(() => {
    if (lastLogin && lastLogin !== today) {
      // New day detected
      const yesterdayEntries = timetable[yesterday] || timetable[lastLogin];
      if (yesterdayEntries && Object.keys(yesterdayEntries).length > 0) {
        setShowCheckIn(true);
      }
    }
    setLastLogin(today);
  }, []);

  const dismissCheckIn = () => setShowCheckIn(false);

  const yesterdayTimetable = timetable[yesterday] || timetable[lastLogin] || {};

  return { showCheckIn, dismissCheckIn, yesterdayTimetable, yesterdayKey: yesterday };
}
