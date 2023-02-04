import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getCameraDisabledStatus } from '../../store/selectors/scanner';
import { overlayStyle } from '../../styles';
import { disabledCameraStyle } from '../../styles/control';

const SnapImage: React.FC<Props> = ({ capture, isCameraDisabled }) => {
  return (
    <View
      style={[
        overlayStyle.cameraOutline,
        disabledCameraStyle(isCameraDisabled),
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={overlayStyle.cameraButton}
        onPress={capture}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  isCameraDisabled: getCameraDisabledStatus(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  capture: () => void;
};

export default connector(SnapImage);
