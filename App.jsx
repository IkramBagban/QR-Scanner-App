import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import DataScreen from './src/Screens/DataScreen';
import CameraScreen from './src/Screens/CameraScreen';
import SavedQr from './src/Screens/SavedQr';
import QRCodeProvider from './src/Context/ContextProvider';
import { darkTheme, lightTheme } from './src/theme';

import { useTheme } from './src/Context/ThemeProvider';
import ToggleTheme from './src/components/ToggleTheme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.header,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" options={{
        headerRight: () => <ToggleTheme />,
      }} component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen
        name="Data"
        component={DataScreen}
        options={{
          title: "QR Detail",
        }}
      />
    </Stack.Navigator>
  );
};

function App() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <QRCodeProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.textSecondary,
            tabBarStyle: {
              backgroundColor: theme.header,
              borderTopColor: theme.border
            },
          })}
        >

          <Tab.Screen
            name="HomeNavigation"
            component={HomeNavigation}
            options={{
              title: "Home"
            }}
          />
          <Tab.Screen
            name="SavedQr"
            component={SavedQr}
            options={{
              title: "Saved QR"
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QRCodeProvider>
  );
}

export default App;
