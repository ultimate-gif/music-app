import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';

import { AppProvider, useApp } from './context/Appcontext';

import { SplashScreen } from './screens/SplashScreen';
import { GetStartedScreen } from './screens/GetStartedScreen';
import { PasscodeScreen } from './screens/PasscodeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { LikedSongsScreen } from './screens/LikedSongs';
import { MiniPlayer } from './components/MiniPlayer';

import { colors } from './styles/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }: any) => {
  const { currentSong } = useApp();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => (
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          ),
          tabBarIcon: ({ focused }) => {
            let iconName: any = 'search';

            if (route.name === 'Search') iconName = 'search';
            if (route.name === 'Library') iconName = 'book';

            return (
              <Feather
                name={iconName}
                size={26}
                color={focused ? colors.primaryStart : colors.textSecondary}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
      </Tab.Navigator>

      {/* ✅ FIX: prevent overlap + safe layering */}
      {currentSong && (
        <View pointerEvents="box-none" style={styles.miniPlayerWrap}>
          <MiniPlayer onPress={() => navigation.navigate('Player')} />
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" />

        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Passcode" component={PasscodeScreen} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="LikedSongs" component={LikedSongsScreen} />
          <Stack.Screen
            name="Player"
            component={PlayerScreen}
            options={{
              presentation: 'fullScreenModal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
    height: 60,
  },
  miniPlayerWrap: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 10, // ✅ FIX: ensure above tabs
  },
});