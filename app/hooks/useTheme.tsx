'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';

type Theme = 'dark' | 'light';
type AccentColor = 'cyan' | 'purple' | 'green' | 'orange';

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ACCENT_VARIABLES: Record<
  AccentColor,
  {
    hex: string;
    rgb: string;
    cyan300: string;
    cyan400: string;
    cyan500: string;
    cyan600: string;
    cyan700: string;
  }
> = {
  cyan: {
    hex: '#22d3d3',
    rgb: '34 211 211',
    cyan300: '#67e8f9',
    cyan400: '#22d3d3',
    cyan500: '#06b6d4',
    cyan600: '#0891b2',
    cyan700: '#0e7490',
  },
  purple: {
    hex: '#a855f7',
    rgb: '168 85 247',
    cyan300: '#d8b4fe',
    cyan400: '#c084fc',
    cyan500: '#a855f7',
    cyan600: '#9333ea',
    cyan700: '#7e22ce',
  },
  green: {
    hex: '#34d399',
    rgb: '52 211 153',
    cyan300: '#86efac',
    cyan400: '#4ade80',
    cyan500: '#22c55e',
    cyan600: '#16a34a',
    cyan700: '#15803d',
  },
  orange: {
    hex: '#fb923c',
    rgb: '251 146 60',
    cyan300: '#fdba74',
    cyan400: '#fb923c',
    cyan500: '#f97316',
    cyan600: '#ea580c',
    cyan700: '#c2410c',
  },
};

function applyAccentVariables(root: HTMLElement, accentColor: AccentColor) {
  const accent = ACCENT_VARIABLES[accentColor];
  root.setAttribute('data-accent', accentColor);
  root.style.setProperty('--accent', accent.hex);
  root.style.setProperty('--accent-rgb', accent.rgb);
  root.style.setProperty('--color-cyan-300', accent.cyan300);
  root.style.setProperty('--color-cyan-400', accent.cyan400);
  root.style.setProperty('--color-cyan-500', accent.cyan500);
  root.style.setProperty('--color-cyan-600', accent.cyan600);
  root.style.setProperty('--color-cyan-700', accent.cyan700);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accentColor, setAccent] = useState<AccentColor>('cyan');
  const [mounted, setMounted] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    const savedAccent = localStorage.getItem('portfolio-accent') as AccentColor;
    
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
    if (savedAccent && ['cyan', 'purple', 'green', 'orange'].includes(savedAccent)) {
      setAccent(savedAccent);
    }
    
    setMounted(true);
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove old theme classes and add new one
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    // Apply accent variables used by utility classes and custom styles
    applyAccentVariables(root, accentColor);
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-accent', accentColor);
    
  }, [theme, accentColor, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  }, []);

  const setAccentColor = useCallback((color: AccentColor) => {
    setAccent(color);
    const root = document.documentElement;
    applyAccentVariables(root, color);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setAccentColor, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
