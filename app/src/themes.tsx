import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';

import Storage from './storage';


interface Colors {
  bgColor: string;
  bgColor2: string;
  buttonColor: string;
  borderColor: string;
  highlightColor: string;
  fontColor: string;
  shimmerColor: string;
  iconColor: string;
  activeSectionMenuColor: string;
}

export interface ThemeColors {
  theme: Colors;
}

interface ThemeModes {
  lightTheme: Colors;
  darkTheme: Colors;
}

const lightThemeColors: Colors = {
  bgColor: 'white',
  bgColor2: '#ececece8',
  buttonColor: 'gray',
  borderColor: '#f2f2ff',
  highlightColor: 'black',
  fontColor: 'black',
  shimmerColor: '#dadadae8',
  iconColor: '#5c5c5c',
  activeSectionMenuColor: '#007AFF',
};
const darkThemeColors: Colors = {
  bgColor: '#131415',
  bgColor2: '#2a2f38',
  buttonColor: 'gray',
  borderColor: '#dadadae8',
  highlightColor: 'blue',
  fontColor: '#fffcf6',
  shimmerColor: '#2a2f38',
  iconColor: '#fafaff',
  activeSectionMenuColor: '#007AFF',
};

const colors: ThemeModes = {
  lightTheme: lightThemeColors,
  darkTheme: darkThemeColors,
};

const defaultTheme: string = 'lightTheme';

async function getCurrentTheme(): Promise<string> {
  const currentTheme: string | undefined = await Storage.getItem('@APODapp:theme');
  return (currentTheme || defaultTheme);
}

const ThemeContext = createContext({
  themeStyle: defaultTheme,
  // eslint-disable-next-line no-console
  setTheme: (theme: string): void => console.log(theme),
  getTheme: (): Promise<string> | string => defaultTheme,
  getColors: (): any => {},
});

export type ThemeContext = {
  themeStyle: string;
  setTheme: (theme: string) => void;
  getTheme: () => Promise<string> | string;
  getColors: () => Colors;
};
export const useTheme = (): ThemeContext => useContext(ThemeContext);

interface Props {
  children: React.ReactNode,
}
function ManageThemeProvider({ children }: Props) {
  const theme: ThemeContext = useTheme();
  const [themeStyle, setThemeStyle] = useState<string>(defaultTheme);

  function setTheme(newTheme: string) {
    theme.setTheme(newTheme);
    setThemeStyle(newTheme);
  }

  function getTheme() {
    return getCurrentTheme();
  }

  function getColors() {
    return themeStyle === 'lightTheme' ? colors.lightTheme : colors.darkTheme;
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

interface Props {
  children: React.ReactNode,
}
const ThemeHandler = ({ children }: Props) => (
  <ManageThemeProvider>{children}</ManageThemeProvider>
);

export default ThemeHandler;
