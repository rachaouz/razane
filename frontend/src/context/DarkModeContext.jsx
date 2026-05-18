import { createContext, useContext, useState, useCallback } from "react";

const STORAGE_KEY = "socilis_dark_mode";

const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkModeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? saved === "true" : true;
  });

  const setDarkMode = useCallback((value) => {
    setDarkModeState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  // "prev =>" : lit la valeur ACTUELLE au moment du clic, pas une valeur figée
  const toggle = useCallback(() => setDarkMode(prev => !prev), [setDarkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error("useDarkMode must be used inside <DarkModeProvider>");
  return ctx;
}