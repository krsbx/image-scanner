import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import LaunchScreen from '../screens/LaunchScreen';
import HomeScreen from '../screens/HomeScreen';
import CropScreen from '../screens/CropScreen';
import { MainNavigationParam } from '../types/Navigation';

const Stack = createStackNavigator<MainNavigationParam>();

const MainNavigation: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Launch"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Launch" component={LaunchScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Crop" component={CropScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigation;
