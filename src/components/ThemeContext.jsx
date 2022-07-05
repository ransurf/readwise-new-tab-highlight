import React, { useEffect } from 'react';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState('light');

  useEffect(() => {
    chrome.storage.sync.get(['settings'], (result) => {
      console.log('settings', result.settings);
      console.log('setthemFunct', setTheme);
      if (result.settings) {
        if (result.settings?.darkMode === true) {
          console.log('dark mode', result.settings.darkMode);
          setTheme('dark');
        } else {
          console.log('light mode', result.settings.darkMode);
          setTheme('light');
        }
      }
    });

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }, []);

  const rawSetTheme = (rawTheme) => {
    console.log('rawSetTheme', rawTheme);
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    console.log('rawTheme', rawTheme);
    root.classList.add(rawTheme);
  };

  React.useEffect(() => {
    rawSetTheme(theme);
    console.log('ThemeProvider: theme changed to', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
