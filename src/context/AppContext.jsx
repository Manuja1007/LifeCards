import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useScreenTime } from "../hooks/useScreenTime";
import { useDailyReset } from "../hooks/useDailyReset";
import { useTimer } from "../hooks/useTimer";
import { generateStoryAI } from "../services/aiService";
import { generateProductivitySuggestions } from "../services/behaviorAnalysisService";
import { getTodayKey } from "../utils/dateUtils";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [page, setPage] = useState("home");
  const [name, setName] = useLocalStorage("lifecards_name", "");
  const [avatar, setAvatar] = useLocalStorage("lifecards_avatar", "boy1");
  const { screenTime, total: screenTimeTotal } = useScreenTime();
  const [answers, setAnswers] = useLocalStorage("lifecards_answers", {});
  const [story, setStory] = useState([]);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyLoading, setStoryLoading] = useState(false);
  const [timetable, setTimetable] = useLocalStorage("lifecards_timetable", {});
  const [moods, setMoods] = useLocalStorage("lifecards_moods", {});
  const [reflections, setReflections] = useLocalStorage("lifecards_reflections", {});
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage("lifecards_achievements", []);
  const timer = useTimer(25, 5);
  const [focusSessions, setFocusSessions] = useLocalStorage("lifecards_focus_sessions", 0);
  const { showCheckIn, dismissCheckIn, yesterdayTimetable, yesterdayKey } = useDailyReset();
  const [checkedItems, setCheckedItems] = useLocalStorage("lifecards_checked_items", {});
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  }, []);

  const login = (userName, userAvatar) => {
    setName(userName);
    if (userAvatar) setAvatar(userAvatar);
  };

  const logout = () => {
    setName("");
    setAvatar("boy1");
    setPage("home");
  };

  const unlockAchievement = useCallback((id) => {
    setUnlockedAchievements((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }, [setUnlockedAchievements]);

  const generateStory = async () => {
    setStoryLoading(true);
    const storyData = { screenTime, answers, mood: moods[getTodayKey()], focusSessions };
    const aiStory = await generateStoryAI(storyData, name);
    setStory(aiStory);
    setStoryIndex(0);
    setStoryLoading(false);
    setPage("story");
    unlockAchievement("first_story");
  };

  const saveAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const saveTimetableEntry = (date, hour, task) => {
    setTimetable((prev) => ({
      ...prev,
      [date]: { ...(prev[date] || {}), [hour]: task },
    }));
    unlockAchievement("timetable_master");
  };

  const removeTimetableEntry = (date, hour) => {
    setTimetable((prev) => {
      const dayEntries = { ...(prev[date] || {}) };
      delete dayEntries[hour];
      return { ...prev, [date]: dayEntries };
    });
  };

  const saveMood = (mood) => {
    const today = getTodayKey();
    setMoods((prev) => ({ ...prev, [today]: mood }));
    unlockAchievement("first_mood");
  };

  const saveReflection = (text) => {
    const today = getTodayKey();
    setReflections((prev) => ({ ...prev, [today]: text }));
    showToast("Reflection saved!");
    unlockAchievement("first_reflection");
  };

  const toggleCheckedItem = (hour) => {
    setCheckedItems((prev) => {
      const dayChecks = { ...(prev[yesterdayKey] || {}) };
      dayChecks[hour] = !dayChecks[hour];
      return { ...prev, [yesterdayKey]: dayChecks };
    });
  };

  // Generate productivity suggestions based on current behavior
  const productivitySuggestions = useMemo(() => {
    return generateProductivitySuggestions(screenTime, focusSessions, moods, moods[getTodayKey()]);
  }, [screenTime, focusSessions, moods]);

  const completeFocusSession = useCallback(() => {
    setFocusSessions((prev) => {
      const next = prev + 1;
      if (next >= 5) unlockAchievement("five_focus");
      return next;
    });
    showToast("Focus session complete!");
    unlockAchievement("first_focus");
  }, [setFocusSessions, showToast, unlockAchievement]);

  const value = {
    page, setPage, name, login, logout, avatar,
    screenTime, screenTimeTotal, answers, saveAnswer,
    story, storyIndex, setStoryIndex, storyLoading, generateStory,
    timetable, saveTimetableEntry, removeTimetableEntry,
    productivitySuggestions,
    moods, saveMood, reflections, saveReflection,
    unlockedAchievements,
    timer, focusSessions, completeFocusSession,
    showCheckIn, dismissCheckIn, yesterdayTimetable, yesterdayKey, checkedItems, toggleCheckedItem,
    toast, showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
