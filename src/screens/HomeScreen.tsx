import React, { createRef, useRef, useEffect } from 'react';
import { LayoutChangeEvent, StatusBar, Platform, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ScannerView as RectScannerView } from 'react-native-rectangle-scanner';
import { AppState } from '../store';
import { setScanner as _setScanner } from '../store/actions/scanner';
import { setDevice as _setDevice } from '../store/actions/device';
import { getScanner } from '../store/selectors/scanner';
import { getDevice } from '../store/selectors/device';
import useSnapAnimation from '../hooks/useSnapAnimation';
import { DIMENSSIONS, SCREEN_NAME } from '../utils/constant';
import ScannerView from '../components/View/Scanner/ScannerView';
import { MainNavigationScreenNavigation } from '../types/Navigation';
import { globalStyle } from '../styles';

const HomeScreen: React.FC<Props> = ({
  scanner,
  device,
  setScanner,
  setDevice,
  cameraIsOn,
}) => {
  const {
    didLoadInitialLayout,
    isMultiTasking,
    isTakingPicture,
    isProcessingImage,
    detectedRectangle,
    isOnScannerView,
    image,
  } = scanner;

  const navigation =
    useNavigation<MainNavigationScreenNavigation<'HomeScreen'>>();
  const { flashOpacity, startSnapAnimation } = useSnapAnimation();

  const cameraRef = createRef<RectScannerView>();
  const imageProcessingTimeout = useRef<ReturnType<typeof setTimeout>>();

  const capture = () => {
    if (isTakingPicture || isProcessingImage || !detectedRectangle) return;

    setScanner({
      isTakingPicture: true,
      isProcessingImage: true,
    });

    cameraRef.current?.capture?.();
    startSnapAnimation();

    imageProcessingTimeout.current = setTimeout(() => {
      if (!isTakingPicture) return;

      setScanner({
        isTakingPicture: false,
      });
    }, 100);
  };

  const turnOnCamera = () => {
    if (isOnScannerView) return;

    setScanner({
      isLoadingCamera: true,
      isOnScannerView: true,
    });
  };

  const turnOffCamera = (shouldUninitializeCamera = false) => {
    if (shouldUninitializeCamera && device.initialized) {
      setScanner({
        isOnScannerView: false,
      });
      setDevice({
        initialized: false,
      });
    } else if (isOnScannerView) {
      setScanner({
        isOnScannerView: false,
      });
    }
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
    if (!didLoadInitialLayout || isMultiTasking) return;

    turnOnCamera();

    return () => {
      if (!imageProcessingTimeout.current) return;

      clearTimeout(imageProcessingTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!didLoadInitialLayout) return;
    if (isMultiTasking) return turnOffCamera(true);
    if (device.initialized && (!device.isHasCamera || device.isHasCameraAccess))
      return turnOffCamera();

    if (cameraIsOn === true && !isOnScannerView) return turnOnCamera();
    if (cameraIsOn === false && isOnScannerView) return turnOffCamera(true);
    if (cameraIsOn === undefined) return turnOnCamera();
  }, [didLoadInitialLayout]);

  useEffect(() => {
    if (!image) return;

    navigation.replace(SCREEN_NAME.CROP, {
      from: SCREEN_NAME.HOME,
    });
  }, [image]);

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
  device: getDevice(state),
});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
  setDevice: _setDevice,
});

type Props = ConnectedProps<typeof connector> & {
  cameraIsOn?: boolean;
};

export default connector(HomeScreen);
