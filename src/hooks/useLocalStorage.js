// NOTES: Works like useState, but also saves the value in the browser so it is still there after a refresh.

import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // The function passed to useState runs only on the first render.
  // It loads the saved value, or falls back to initialValue.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      // Saved text was corrupted or storage is unavailable: start fresh.
      return initialValue;
    }
  });

  // Re-save to localStorage whenever the value changes.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}