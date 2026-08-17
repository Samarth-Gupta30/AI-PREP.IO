import React, { createContext, useState, useEffect } from 'react';

// 1. Initialize the context cloud
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check local storage or system preferences for dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Toggle function
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Apply Tailwind 'dark' class to the HTML root tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    // 2. Wrap children and provide the shared data
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
