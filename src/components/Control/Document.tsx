import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { setScanner as _setScanner } from '../../store/actions/scanner';
import { controlStyle } from '../../styles';

const Document: React.FC<Props> = ({ setScanner }) => {
  const onPress = async () => {
    const { uri } = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf, 'image/jpg', 'image/jpeg'],
    });

    const ext = uri.split('.').pop();

    switch (ext) {
      case 'jpeg':
      case 'jpg':
        break;

      case 'pdf':
        break;

      default:
        break;
    }
  };

  return (
    <View style={controlStyle.buttonGroup}>
      <TouchableOpacity
        style={controlStyle.button}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View
          style={[
            {
              position: 'relative',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Icon
            name="ios-document-sharp"
            size={40}
            color="white"
            style={controlStyle.buttonIcon}
          />
          <Text style={controlStyle.buttonText}>Pick</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Document);
