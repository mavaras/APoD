import React, { createContext, useContext, useState } from 'react';
import ThemeManager from 'react-native-color-theme';
import { ThemeProvider } from 'styled-components/native';

import Storage from './storage';


const colors = {
  lightTheme: {
    bgColor: 'white',
    bgColor2: '#ececece8',
    buttonColor: 'gray',
    borderColor: '#f2f2ff',
    highlightColor: 'black',
    fontColor: 'black',
    shimmerColor: '#dadadae8',
    iconColor: '#5c5c5c',
    activeSectionMenuColor: '#007AFF',
  },
  darkTheme: {
    bgColor: '#131415',
    bgColor2: '#2a2f38',
    buttonColor: 'gray',
    borderColor: '#dadadae8',
    highlightColor: 'blue',
    fontColor: '#fffcf6',
    shimmerColor: '#2a2f38',
    iconColor: '#fafaff',
    activeSectionMenuColor: '#007AFF',
  },
};
const themeManager: ThemeManager = new ThemeManager(colors);

const defaultTheme: string = 'lightTheme';

async function getCurrentTheme(): Promise<string> {
  const currentTheme: string | undefined = await Storage.getItem('@APODapp:theme');
  themeManager.setTheme(currentTheme);
  return (currentTheme || defaultTheme);
}

const ThemeContext = createContext({
  themeStyle: getCurrentTheme(),
  setTheme: (theme: string): void => themeManager.setTheme(theme),
  getTheme: (): string => themeManager.getTheme(),
  getColors: (): any => (themeManager.getTheme() === 'lightTheme' ? colors.lightTheme : colors.darkTheme),
});

export type ThemeContext = {
  themeStyle: Promise<String>;
  setTheme: (theme: string) => void;
  getTheme: () => string;
  getColors: () => { [id: string] : string; };
};
export const useTheme = (): ThemeContext => useContext(ThemeContext);

function ManageThemeProvider({ children }) {
  const theme: ThemeContext = useTheme();
  const [themeStyle, setThemeStyle] = useState<string>(theme.getTheme());

  function setTheme(newTheme: string) {
    theme.setTheme(newTheme);
    setThemeStyle(newTheme);
  }

  function getTheme() {
    return theme.getTheme();
  }

  function getColors() {
    return theme.getTheme() === 'lightTheme' ? colors.lightTheme : colors.darkTheme;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeStyle, setTheme, getTheme, getColors,
      }}
    >
      <ThemeProvider theme={themeStyle === 'lightTheme' ? colors.lightTheme : colors.darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

themeManager.setTheme('lightTheme');

interface Props {
  children: React.ReactNode,
}
export const ThemeHandler = ({ children }: Props) => (
  <ManageThemeProvider>{children}</ManageThemeProvider>
);

export default themeManager;
