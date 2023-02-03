import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { setScanner as _setScanner } from '../../store/actions/scanner';
import { getFlashStatus } from '../../store/selectors/scanner';
import { overlayStyle, controlStyle } from '../../styles';

const FlashControl: React.FC<Props> = ({ isFlashEnabled, setScanner }) => {
  const onPressOnFlash = () =>
    setScanner((prev) => ({ isFlashEnabled: !prev.isFlashEnabled }));

  return (
    <TouchableOpacity
      style={[
        overlayStyle.flashIcon,
        { backgroundColor: isFlashEnabled ? '#FFFFFF80' : '#00000080' },
      ]}
      activeOpacity={0.8}
      onPress={onPressOnFlash}
    >
      <Icon
        name="ios-flashlight"
        style={[
          controlStyle.buttonIcon,
          { fontSize: 28, color: isFlashEnabled ? '#333' : '#FFF' },
        ]}
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: AppState) => ({
  isFlashEnabled: getFlashStatus(state),
});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector>;

export default connector(FlashControl);
