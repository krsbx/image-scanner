import React from 'react';
import { ActivityIndicator, Animated, View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { ScannerView as RectScannerView } from 'react-native-rectangle-scanner';
import { AppState } from '../../../store';
import { getDevice } from '../../../store/selectors/device';
import { getScanner } from '../../../store/selectors/scanner';
import useCameraMessage from '../../../hooks/useCameraMessage';
import CameraView from './CameraView';
import { globalStyle, overlayStyle } from '../../../styles';

const ScannerView: React.FC<Props> = ({
  capture,
  cameraRef,
  flashOpacity,
  scanner,
  device,
  cameraIsOn,
}) => {
  const cameraErorrMessage = useCameraMessage({
    initialized: device.initialized,
    isHasCamera: device.isHasCamera,
    isHasCameraAccess: device.isHasCameraAccess,
    isMultiTasking: scanner.isMultiTasking,
  });

  if (scanner.isOnScannerView) {
    return (
      <CameraView
        capture={capture}
        flashOpacity={flashOpacity}
        cameraIsOn={cameraIsOn}
        cameraRef={cameraRef}
      />
    );
  }

  return (
    <View style={globalStyle.notAvailableContainer}>
      {scanner.isLoadingCamera ? (
        <View style={overlayStyle.container}>
          <View style={overlayStyle.loadingContainer}>
            <ActivityIndicator color="white" />
            <Text style={overlayStyle.loadingCameraMessage}>
              Loading Camera
            </Text>
          </View>
        </View>
      ) : (
        <Text style={globalStyle.notAvailableText}>{cameraErorrMessage}</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  scanner: getScanner(state),
  device: getDevice(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  cameraIsOn?: boolean;
  capture: () => void;
  flashOpacity: Animated.Value;
  cameraRef: React.RefObject<RectScannerView>;
};

export default connector(ScannerView);
