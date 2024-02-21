import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../Context/ThemeProvider';
import { darkTheme, lightTheme } from '../theme';

const ToggleTheme = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
//   console.log("isDarkMode", isDarkMode)

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text style={{ marginRight: 15, color: theme.text }}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleTheme;
