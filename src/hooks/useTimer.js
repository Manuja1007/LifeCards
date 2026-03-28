import { useState, useRef, useCallback, useEffect } from "react";

export function useTimer(workMinutes = 25, breakMinutes = 5) {
  const [status, setStatus] = useState("idle"); // idle | working | break | paused
  const [remaining, setRemaining] = useState(workMinutes * 60);
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const pausedAtRef = useRef(null);
  const wasWorkingRef = useRef(true);

  const totalSeconds = status === "break" ? breakMinutes * 60 : workMinutes * 60;

  const tick = useCallback(() => {
    if (!endTimeRef.current) return;
    const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
    setRemaining(left);
    if (left <= 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      endTimeRef.current = null;
      return true; // done
    }
    return false;
  }, []);

  const start = useCallback(() => {
    if (status === "idle") {
      endTimeRef.current = Date.now() + workMinutes * 60 * 1000;
      wasWorkingRef.current = true;
      setStatus("working");
    } else if (status === "paused") {
      const left = pausedAtRef.current || remaining;
      endTimeRef.current = Date.now() + left * 1000;
      setStatus(wasWorkingRef.current ? "working" : "break");
    }
    intervalRef.current = setInterval(() => {
      const done = tick();
      if (done) {
        // handled in effect
      }
    }, 250);
  }, [status, remaining, workMinutes, tick]);

  const pause = useCallback(() => {
    if (status === "working" || status === "break") {
      wasWorkingRef.current = status === "working";
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      pausedAtRef.current = remaining;
      endTimeRef.current = null;
      setStatus("paused");
    }
  }, [status, remaining]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    endTimeRef.current = null;
    pausedAtRef.current = null;
    setRemaining(workMinutes * 60);
    setStatus("idle");
  }, [workMinutes]);

  // Handle phase completion
  useEffect(() => {
    if (remaining === 0 && (status === "working" || status === "break")) {
      if (status === "working") {
        // Switch to break
        setRemaining(breakMinutes * 60);
        endTimeRef.current = Date.now() + breakMinutes * 60 * 1000;
        wasWorkingRef.current = false;
        setStatus("break");
        intervalRef.current = setInterval(() => tick(), 250);
        return; // will return "completed" via onWorkComplete callback
      } else {
        // Break done, go idle
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        endTimeRef.current = null;
        setRemaining(workMinutes * 60);
        setStatus("idle");
      }
    }
  }, [remaining, status, breakMinutes, workMinutes, tick]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Visibility change handler
  useEffect(() => {
    const handler = () => {
      if (!document.hidden && endTimeRef.current) tick();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [tick]);

  const workCompleted = remaining === 0 && status === "break";

  return { status, remaining, totalSeconds, start, pause, reset, workCompleted };
}
