import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import LaunchScreen from '../screens/LaunchScreen';
import HomeScreen from '../screens/HomeScreen';
import CropScreen from '../screens/CropScreen';
import CollectionScreen from '../screens/CollectionScreen';
import GradingScreen from '../screens/GradingScreen';
import { MainNavigationParam } from '../types/Navigation';
import { SCREEN_NAME } from '../utils/constant';

const Stack = createStackNavigator<MainNavigationParam>();

const MainNavigation: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.LAUNCH}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAME.LAUNCH} component={LaunchScreen} />
        <Stack.Screen name={SCREEN_NAME.HOME} component={HomeScreen} />
        <Stack.Screen name={SCREEN_NAME.CROP} component={CropScreen} />
        <Stack.Screen
          name={SCREEN_NAME.COLLECTION}
          component={CollectionScreen}
        />
        <Stack.Screen name={SCREEN_NAME.GRADING} component={GradingScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigation;
