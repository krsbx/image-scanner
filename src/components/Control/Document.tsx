import _ from 'lodash';
import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { setScanner as _setScanner } from '../../store/actions/scanner';
import { controlStyle } from '../../styles';
import { MainNavigationScreenNavigation } from '../../types/Navigation';
import { DEFAULT_RECTANGLE, SCREEN_NAME } from '../../utils/constant';

const Document: React.FC<Props> = ({ setScanner }) => {
  const navigation =
    useNavigation<MainNavigationScreenNavigation<'HomeScreen'>>();

  const onPress = async () => {
    setScanner({
      isOnScannerView: false,
    });

    const { fileCopyUri: filePath, name } = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf, 'image/jpg', 'image/jpeg'],
      copyTo: 'cachesDirectory',
    });

    if (!filePath) return;

    const ext = name?.split('.').pop();

    switch (ext) {
      case 'jpeg':
      case 'jpg': {
        setScanner({
          image: {
            initialImage: filePath,
            croppedImage: '',
          },
        });

        Image.getSize(filePath, (width, height) => {
          setScanner({
            detectedRectangle: DEFAULT_RECTANGLE(width, height),
          });
        });

        navigation.replace(SCREEN_NAME.CROP, {});
        break;
      }

      case 'pdf': {
        const { height, uri, width } = await PdfThumbnail.generate(
          filePath,
          0,
          90
        );

        setScanner({
          image: {
            initialImage: uri,
            croppedImage: '',
          },
          detectedRectangle: DEFAULT_RECTANGLE(width, height),
        });

        navigation.replace(SCREEN_NAME.CROP, {});
        break;
      }

      default:
        navigation.replace(SCREEN_NAME.HOME);
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

const connector = connect(null, {
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector>;

export default connector(Document);
