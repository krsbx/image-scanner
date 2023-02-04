import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import LaunchScreen from '../screens/LaunchScreen';
import HomeScreen from '../screens/HomeScreen';
import CropScreen from '../screens/CropScreen';
import CollectionScreen from '../screens/CollectionScreen';
import GradingScreen from '../screens/GradingScreen';
import { MainNavigationParam } from '../types/Navigation';

const Stack = createStackNavigator<MainNavigationParam>();

const MainNavigation: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Stack.Navigator
        initialRouteName="LaunchScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CropScreen" component={CropScreen} />
        <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
        <Stack.Screen name="GradingScreen" component={GradingScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigation;
