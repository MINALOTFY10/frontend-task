import { useState } from "react";
const storage_key = "theme";

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme());

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };
  return { theme, toggleTheme };
}

function getInitialTheme() {
  return localStorage.getItem(storage_key) === "dark" ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem(storage_key, theme);
}

applyTheme(getInitialTheme());
