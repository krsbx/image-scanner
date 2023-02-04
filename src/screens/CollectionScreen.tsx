import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect, ConnectedProps } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppState } from '../store';
import {
  deleteDetectedRectangle as _deleteDetectedRectangle,
  deleteImage as _deleteImage,
} from '../store/actions/scanner';
import { getStoredImages } from '../store/selectors/scanner';
import { controlStyle, globalStyle } from '../styles';

const CollectionScreen: React.FC<Props> = ({
  images: reduxImages,
  deleteDetectedRectangle,
  deleteImage,
}) => {
  const [images, setImages] = useState(reduxImages);

  const removeImage = (index: number) => {
    deleteImage(index);
    deleteDetectedRectangle(index);

    setImages((prev) => prev.filter((_, id) => id !== index));
  };

  return (
    <FlatGrid
      itemDimension={90}
      data={images}
      style={[globalStyle.mainContainer]}
      renderItem={({ item, index }) => (
        <View
          key={`collections-${index}`}
          style={{ position: 'relative', marginTop: 10, marginHorizontal: 5 }}
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
            onPress={() => removeImage(index)}
          >
            <Icon
              name="ios-close-circle"
              size={25}
              style={controlStyle.buttonIcon}
            />
          </TouchableOpacity>
        </View>
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
});

type Props = ConnectedProps<typeof connector>;

export default connector(CollectionScreen);
