import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { IMAGE } from '../../assets';
import { AppState } from '../../store';
import { getStoredImages, getTotalImage } from '../../store/selectors/scanner';
import { controlStyle, overlayStyle } from '../../styles';

const Gallery: React.FC<Props> = ({ totalImage, images }) => {
  return (
    <View style={controlStyle.buttonGroup}>
      <TouchableOpacity style={controlStyle.button} activeOpacity={0.8}>
        <View
          style={[
            overlayStyle.cameraOutline,
            {
              position: 'relative',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <View
            style={{
              position: 'absolute',
              right: -5,
              top: -5,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 20,
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 10 }}>
              {totalImage > 99 ? `${totalImage}+` : totalImage}
            </Text>
          </View>
          <Image
            source={
              totalImage ? { uri: images[0].initialImage } : IMAGE.ITERA_LOGO
            }
            style={{
              position: 'absolute',
              width: 42,
              height: 42,
              borderRadius: 42,
              resizeMode: 'cover',
              borderWidth: 0.5,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  totalImage: getTotalImage(state),
  images: getStoredImages(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Gallery);
