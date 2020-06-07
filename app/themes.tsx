import React, { createContext, useContext, useState } from 'react';
import ThemeManager from 'react-native-color-theme';
import { ThemeProvider } from 'styled-components/native';


const colors = new ThemeManager({
  lightTheme: {
    bgColor: 'white',
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
    buttonColor: 'gray',
    borderColor: '#f2f2ff',
    highlightColor: 'blue',
    fontColor: '#fffcf6',
    shimmerColor: '#2a2f38',
    iconColor: '#fafaff',
    activeSectionMenuColor: '#007AFF',
  },
});

const c = {
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

const ThemeContext = createContext({
  themeStyle: 'lightTheme',
  setTheme: (theme: string) => colors.setTheme(theme),
  getTheme: (): string => colors.getTheme(),
  getColors: (): any => (colors.getTheme() === 'lightTheme' ? c.lightTheme : c.darkTheme),
});

export const useTheme = () => useContext(ThemeContext);

function ManageThemeProvider({ children }) {
  const theme = useTheme();
  const [themeStyle, setThemeStyle] = useState(theme.getTheme());

  function setTheme(newTheme: string) {
    theme.setTheme(newTheme);
    setThemeStyle(newTheme);
  }

  function getTheme() {
    return theme.getTheme();
  }

  function getColors() {
    return theme.getTheme() === 'lightTheme' ? c.lightTheme : c.darkTheme;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeStyle, setTheme, getTheme, getColors,
      }}
    >
      <ThemeProvider theme={themeStyle === 'lightTheme' ? c.lightTheme : c.darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

colors.setTheme('lightTheme');

export const ThemeHandler = ({ children }) => (
  <ManageThemeProvider>{children}</ManageThemeProvider>
);

export default colors;
