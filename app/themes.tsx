import ThemeManager from 'react-native-color-theme';


const colors = new ThemeManager({
  lightTheme: {
    bgColor: 'white',
    buttonColor: 'gray',
    borderColor: '#f2f2ff',
    highlightColor: 'black',
    shimmerColor: '#dadadae8',
    iconColor: '#5c5c5c',
  },
  darkTheme: {
  },
});

colors.setTheme('lightTheme');

export default colors;
