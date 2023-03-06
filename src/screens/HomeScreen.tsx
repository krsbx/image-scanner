import React, { createRef, useEffect, useCallback } from 'react';
import {
  LayoutChangeEvent,
  StatusBar,
  Platform,
  View,
  BackHandler,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { connect, ConnectedProps } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScannerView as RectScannerView } from 'react-native-rectangle-scanner';
import { AppState } from '../store';
import { setScanner as _setScanner } from '../store/actions/scanner';
import { getScanner } from '../store/selectors/scanner';
import useSnapAnimation from '../hooks/useSnapAnimation';
import { DIMENSSIONS, SCREEN_NAME } from '../utils/constant';
import ScannerView from '../components/View/Scanner/ScannerView';
import { MainNavigationScreenNavigation } from '../types/Navigation';
import { globalStyle } from '../styles';
import useCameraInitializer from '../hooks/useCameraInitializer';

const HomeScreen: React.FC<Props> = ({ scanner, setScanner, cameraIsOn }) => {
  const { didLoadInitialLayout, isTakingPicture, isProcessingImage, image } =
    scanner;

  const navigation =
    useNavigation<MainNavigationScreenNavigation<'HomeScreen'>>();
  const { flashOpacity, startSnapAnimation } = useSnapAnimation();

  const cameraRef = createRef<RectScannerView>();

  useCameraInitializer(cameraIsOn);

  const capture = () => {
    if (isTakingPicture || isProcessingImage) return;

    setScanner({
      isTakingPicture: true,
      isProcessingImage: true,
    });

    cameraRef.current?.capture?.();
    startSnapAnimation();

    setScanner({
      imageProcessingTimeout: setTimeout(() => {
        if (!isTakingPicture) return;

        setScanner({
          isTakingPicture: false,
        });
      }, 100),
    });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    // This is used to detect multi tasking mode on iOS/iPad
    // Camera use is not allowed
    if (didLoadInitialLayout && Platform.OS === 'ios') {
      const screenWidth = DIMENSSIONS.WIDTH;
      const isMultiTasking =
        Math.round(event.nativeEvent.layout.width) < Math.round(screenWidth);

      setScanner({
        isMultiTasking,
        isLoadingCamera: false,
      });

      return;
    }

    setScanner({
      didLoadInitialLayout: true,
    });
  };

  useEffect(() => {
    if (!image) return;

    setScanner({
      isFlashEnabled: false,
    });

    navigation.replace(SCREEN_NAME.CROP, {
      from: SCREEN_NAME.HOME,
    });
  }, [image]); // eslint-disable-line react-hooks/exhaustive-deps

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        RNExitApp.exitApp();

        return true;
      };

      const subs = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subs.remove();
    }, [])
  );

  return (
    <View style={globalStyle.mainContainer} onLayout={onLayout}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
        hidden={Platform.OS !== 'android'}
      />
      <ScannerView
        flashOpacity={flashOpacity}
        cameraIsOn={cameraIsOn}
        cameraRef={cameraRef}
        capture={capture}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  scanner: getScanner(state),
});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector> & {
  cameraIsOn?: boolean;
};

export default connector(HomeScreen);
