import React, { useCallback } from 'react';
import { BackHandler, Image, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
import { connect, ConnectedProps } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppState } from '../store';
import {
  deleteDetectedRectangle as _deleteDetectedRectangle,
  deleteImage as _deleteImage,
  setScanner as _setScanner,
} from '../store/actions/scanner';
import { getStoredImages } from '../store/selectors/scanner';
import { controlStyle, globalStyle } from '../styles';
import { MainNavigationScreenNavigation } from '../types/Navigation';

const CollectionScreen: React.FC<Props> = ({
  images,
  deleteDetectedRectangle,
  deleteImage,
  setScanner,
}) => {
  const navigation =
    useNavigation<MainNavigationScreenNavigation<'CollectionScreen'>>();

  const onRemoveImage = (index: number) => {
    deleteImage(index);
    deleteDetectedRectangle(index);
  };

  const onSelectImage = (index: number) => {
    if (!images[index]) return;

    setScanner((prev) => ({
      selectedImage: index,
      image: prev.images[index],
      detectedRectangle: prev.detectedRectangles[index],
    }));

    navigation.replace('CropScreen');
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.replace('HomeScreen');

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
    <FlatGrid
      itemDimension={90}
      data={images}
      style={[globalStyle.mainContainer]}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{ position: 'relative', marginTop: 10, marginHorizontal: 5 }}
          activeOpacity={0.8}
          onPress={() => onSelectImage(index)}
          key={`collections-${index}`}
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
              source={{ uri: `data:image/png;base64,${item.croppedImage}` }}
              resizeMode={'cover'}
              style={{
                height: 150,
              }}
            />
          </View>
          <TouchableOpacity
            style={{ position: 'absolute', top: -10, right: -10 }}
            activeOpacity={0.8}
            onPress={() => onRemoveImage(index)}
          >
            <Icon
              name="ios-close-circle"
              size={25}
              style={controlStyle.buttonIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  images: getStoredImages(state),
});

const connector = connect(mapStateToProps, {
  deleteImage: _deleteImage,
  deleteDetectedRectangle: _deleteDetectedRectangle,
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CollectionScreen);
