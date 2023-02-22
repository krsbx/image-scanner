import React, { useCallback } from 'react';
import { BackHandler, TouchableOpacity, Text, View } from 'react-native';
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
import { gradeImages as _gradeImages } from '../store/actions/grader';
import {
  getStoredDetectedRectangles,
  getStoredImages,
} from '../store/selectors/scanner';
import { controlStyle, globalStyle } from '../styles';
import { MainNavigationScreenNavigation } from '../types/Navigation';
import { getGrader } from '../store/selectors/grader';
import GradingOverlay from '../components/Overlay/GradingOverlay';
import { DIMENSSIONS, SCREEN_NAME } from '../utils/constant';
import ScannedDocument from '../components/ScannedDocument';

const CollectionScreen: React.FC<Props> = ({
  images,
  detectedRectangles,
  grader,
  deleteDetectedRectangle,
  deleteImage,
  setScanner,
  gradeImages,
}) => {
  const navigation =
    useNavigation<MainNavigationScreenNavigation<'CollectionScreen'>>();

  const onPressOnBack = () => navigation.replace(SCREEN_NAME.HOME);

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

    navigation.replace(SCREEN_NAME.CROP, {
      from: SCREEN_NAME.COLLECTION,
    });
  };

  const onSubmitImages = async () => {
    try {
      await gradeImages(
        images.map(({ croppedImage }) => ({
          image: croppedImage,
        }))
      );

      navigation.replace(SCREEN_NAME.GRADING);
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        onPressOnBack();

        return true;
      };

      const subs = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subs.remove();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <View style={[globalStyle.mainContainer]}>
      <View style={[{ height: DIMENSSIONS.HEIGHT * 0.85 }]}>
        <FlatGrid
          itemDimension={90}
          data={images}
          renderItem={({ item, index }) => (
            <ScannedDocument
              croppedImage={item.croppedImage}
              detectedRectangle={detectedRectangles[index]}
              withClose
              onPressOnClose={() => onRemoveImage(index)}
              onPressOnImage={() => onSelectImage(index)}
              key={`collections-${index}`}
            />
          )}
        />
      </View>
      <View style={[globalStyle.buttonBottomContainer]}>
        <TouchableOpacity
          style={[controlStyle.button]}
          activeOpacity={0.8}
          onPress={onPressOnBack}
        >
          <Icon
            name="ios-arrow-undo-circle"
            size={40}
            style={controlStyle.buttonIcon}
          />
          <Text style={controlStyle.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[controlStyle.button]}
          activeOpacity={0.8}
          onPress={onSubmitImages}
          disabled={grader.isOnGrading}
        >
          <Icon
            name="ios-checkmark-circle"
            size={40}
            color="white"
            style={controlStyle.buttonIcon}
          />
          <Text style={controlStyle.buttonText}>Grade</Text>
        </TouchableOpacity>
      </View>
      {grader.isOnGrading ? <GradingOverlay /> : null}
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  images: getStoredImages(state),
  detectedRectangles: getStoredDetectedRectangles(state),
  grader: getGrader(state),
});

const connector = connect(mapStateToProps, {
  deleteImage: _deleteImage,
  deleteDetectedRectangle: _deleteDetectedRectangle,
  setScanner: _setScanner,
  gradeImages: _gradeImages,
});

type Props = ConnectedProps<typeof connector>;

export default connector(CollectionScreen);
