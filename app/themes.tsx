import React, { createContext, useContext, useState, useEffect } from 'react';
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
  },
  darkTheme: {
    bgColor: 'red',
    buttonColor: 'gray',
    borderColor: '#f2f2ff',
    highlightColor: 'blue',
    fontColor: 'green',
    shimmerColor: '#dadadae8',
    iconColor: '#5c5c5c',
  },
});

const c = {
  lightTheme: {
    bgColor: 'white',
    buttonColor: 'gray',
    borderColor: '#f2f2ff',
    highlightColor: 'black',
    fontColor: 'black',
    shimmerColor: '#dadadae8',
    iconColor: '#5c5c5c',
  },
  darkTheme: {
    bgColor: '#131415',
    buttonColor: 'gray',
    borderColor: '#f2f2ff',
    highlightColor: 'blue',
    fontColor: '#fffcf6',
    shimmerColor: '#2a2f38',
    iconColor: '#fafaff',
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
  const [themeStyle, setThemeStyle] = useState('lightTheme');

  function setTheme(theme: string) {
    setThemeStyle(theme);
  }

  function getTheme() {
    return themeStyle;
  }

  function getColors() {
    return getTheme() === 'lightTheme' ? c.lightTheme : c.darkTheme;
  }

  return (
    <ThemeContext.Provider
      value={{ theme: themeStyle, setTheme, getTheme, getColors }}
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
