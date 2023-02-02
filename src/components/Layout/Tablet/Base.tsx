import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FlashControl from '../../Overlay/FlashControl';
import { AppState } from '../../../store';
import { controlStyle, globalStyle, overlayStyle } from '../../../styles';
import { getCameraDisabledStatus } from '../../../store/selectors/scanner';
import { disabledCameraStyle } from '../../../styles/control';

const BaseTabletLayout: React.FC<Props> = ({ capture, isCameraDisabled }) => {
  return (
    <View style={globalStyle.buttonContainer}>
      <View
        style={[
          controlStyle.buttonActionGroup,
          {
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 28,
          },
        ]}
      >
        <FlashControl />
        <View style={[controlStyle.buttonGroup, { marginLeft: 8 }]}>
          <TouchableOpacity
            style={[controlStyle.button, disabledCameraStyle(isCameraDisabled)]}
            activeOpacity={0.8}
          >
            <Icon
              name="arrow-forward-circle"
              size={40}
              color="white"
              style={controlStyle.buttonIcon}
            />
            <Text style={controlStyle.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      <View style={[controlStyle.buttonActionGroup, { marginTop: 28 }]}>
        <View style={controlStyle.buttonGroup}>
          <TouchableOpacity style={controlStyle.button} activeOpacity={0.8}>
            <Icon
              name="ios-close-circle"
              size={40}
              style={controlStyle.buttonIcon}
            />
            <Text style={controlStyle.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default connector(BaseTabletLayout);
