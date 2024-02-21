import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { darkTheme, lightTheme } from '../theme';
import CustomButton from '../components/CustomButton';
import { isDarkMode, useTheme } from '../Context/ThemeProvider';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        This QR Code Only Handles Text Properly
      </Text>
      <CustomButton
        title="Scan QR Code"
        onPress={() => navigation.navigate('Camera')}
        backgroundColor={theme.primary}
        textColor={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
