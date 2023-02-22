import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DetectedRectangle } from 'react-native-rectangle-scanner';
import { controlStyle } from '../styles';

const ScannedDocument: React.FC<Props> = ({
  croppedImage,
  withClose = true,
  onPressOnClose,
  onPressOnImage,
}) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          position: 'relative',
          marginTop: 10,
          marginHorizontal: 5,
        }}
        activeOpacity={0.8}
        onPress={onPressOnImage}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.8)',
            padding: 2,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: `data:image/png;base64,${croppedImage}` }}
            resizeMode={'cover'}
            style={[
              {
                height: 150,
              },
            ]}
          />
        </View>
        {withClose ? (
          <TouchableOpacity
            style={{ position: 'absolute', top: -10, right: -10 }}
            activeOpacity={0.8}
            onPress={onPressOnClose}
          >
            <Icon
              name="ios-close-circle"
              size={25}
              style={controlStyle.buttonIcon}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </React.Fragment>
  );
};

type Props = {
  detectedRectangle: DetectedRectangle;
  croppedImage: string;
  withClose?: boolean;
  onPressOnClose?: () => void;
  onPressOnImage?: () => void;
};

export default ScannedDocument;
