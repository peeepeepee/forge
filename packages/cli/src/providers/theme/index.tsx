import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { type ThemeColors, type Theme, THEMES, DEFAULT_THEME } from "../../theme";

const CONFIG_DIR = join(homedir(), ".forgecode");
const THEME_PREFERENCES_PATH = join(CONFIG_DIR, "preferences.json")

type Themepreferences = {
  themeName: string;
}

function getIntialTheme(): Theme{
  try {
    const preferences = JSON.parse(
      readFileSync(THEME_PREFERENCES_PATH, "utf-8"),
    ) as Partial<Themepreferences>
    const savedTheme = THEMES.find((theme) => theme.name === preferences.themeName)
    return savedTheme ?? DEFAULT_THEME
  } catch {
    return DEFAULT_THEME;
  }
}

function persistTheme(theme: Theme) {
  try {
    mkdirSync(CONFIG_DIR, {recursive: true})
    writeFileSync(
      THEME_PREFERENCES_PATH,
      JSON.stringify({ themeName: theme.name } satisfies Themepreferences,
      null, 2),
      "utf8",
    )
  }catch{}
}

type ThemeContextValue = {
  colors: ThemeColors;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue{
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return value;
}

type ThemeProviderProps = {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getIntialTheme());

  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    persistTheme(theme);
  },[])

  return (
    <ThemeContext.Provider
      value={{ colors: currentTheme.colors, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
