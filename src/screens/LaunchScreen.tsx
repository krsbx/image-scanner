import React, { useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE } from '../assets';
import useCameraPermission from '../hooks/useCameraPermission';
import useEffectOnce from '../hooks/useEffectOnce';
import { MainNavigationScreenNavigation } from '../types/Navigation';
import { DIMENSSIONS } from '../utils/constant';

const LaunchScreen: React.FC = () => {
  const navigation =
    useNavigation<MainNavigationScreenNavigation<'LaunchScreen'>>();
  const logoOpacity = useRef(new Animated.Value(0));
  const textOpacity = useRef(new Animated.Value(0));
  const transformDown = useRef(new Animated.Value(0));

  const { requestCameraPermissions } = useCameraPermission();

  const requestPermissions = async () => {
    const status = await requestCameraPermissions();

    switch (status) {
      case 'granted': {
        navigation.replace('HomeScreen');
        return;
      }

      default: {
        requestPermissions();
        return;
      }
    }
  };

  const startSplashScreen = () => {
    Animated.sequence([
      Animated.timing(logoOpacity.current, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(logoOpacity.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.exp,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(transformDown.current, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(transformDown.current, {
        toValue: DIMENSSIONS.HEIGHT / 8,
        duration: 1000,
        delay: 1000,
        useNativeDriver: false,
        easing: Easing.bezier(0.5, 0, 0.1, 1),
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(textOpacity.current, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacity.current, {
        toValue: 1,
        duration: 500,
        delay: 1200,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.circle),
      }),
    ]).start();
  };

  useEffectOnce(startSplashScreen);

  useEffectOnce(async () => {
    const status = await requestCameraPermissions();

    switch (status) {
      case 'granted': {
        setTimeout(() => navigation.replace('HomeScreen'), 2000);
        return;
      }

      default: {
        requestPermissions();
        return;
      }
    }
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.Image
        source={IMAGE.GLT_2}
        style={{
          width: DIMENSSIONS.WIDTH,
          height: DIMENSSIONS.HEIGHT,
          position: 'absolute',
        }}
        resizeMode={'cover'}
      />
      <View
        style={{
          width: DIMENSSIONS.WIDTH,
          height: DIMENSSIONS.HEIGHT,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          opacity: 0.3,
        }}
      />
      <Animated.View
        style={{
          flex: 1,
          top: -100,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: textOpacity.current,
        }}
      >
        <Animated.Text
          style={{
            color: 'rgba(0, 0, 0, 1)',
            textTransform: 'uppercase',
            fontWeight: '900',
            letterSpacing: 5,
            fontSize: 30,
          }}
        >
          FACADE
        </Animated.Text>
        <Animated.Text
          style={{
            color: 'rgba(0, 0, 0, 1)',
            textTransform: 'uppercase',
            fontWeight: '900',
            letterSpacing: 5,
            fontSize: 30,
          }}
        >
          GRADER
        </Animated.Text>
      </Animated.View>
      <Animated.Image
        source={IMAGE.ITERA_LOGO}
        style={{
          resizeMode: 'contain',
          width: DIMENSSIONS.HEIGHT / (DIMENSSIONS.ASPECT_RATIO * 1.5),
          height: DIMENSSIONS.WIDTH / (DIMENSSIONS.ASPECT_RATIO * 1.5),
          opacity: logoOpacity.current,
          transform: [
            {
              translateY: transformDown.current,
            },
          ],
        }}
      />
    </Animated.View>
  );
};

export default LaunchScreen;
