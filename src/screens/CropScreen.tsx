import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomCrop, {
  CustomCropProps,
  CustomCropView,
} from 'react-native-perspective-image-cropper';
import { DetectedRectangle } from 'react-native-rectangle-scanner';
import { connect, ConnectedProps } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppState } from '../store';
import {
  setScanner as _setScanner,
  updateImage as updateImage,
  updateDetectedRectangle as _updateDetectedRectangle,
  pushImage as _pushImage,
  pushDetectedRectangle as _pushDetectedRectangle,
} from '../store/actions/scanner';
import {
  getCropState,
  getSelectedImageIndex,
} from '../store/selectors/scanner';
import { controlStyle, globalStyle } from '../styles';
import { MainNavigationScreenNavigation } from '../types/Navigation';

const CropScreen: React.FC<Props> = ({
  setScanner,
  image,
  detectedRectangle,
  selectedImage,
  updateImage,
  updateDetectedRectangle,
  pushImage,
  pushDetectedRectangle,
}) => {
  const navigation =
    useNavigation<MainNavigationScreenNavigation<'CropScreen'>>();

  const [initialImage] = useState(image?.initialImage);
  const [rectangleCoordinates, setRectangleCoordinates] =
    useState(detectedRectangle);
  const [{ height, width }] = useState(detectedRectangle?.dimensions);
  const [croppedImage, setCroppedImage] = useState<string>();
  const cropRef = useRef<CustomCropView>();

  const onUpdateImage = (image: string, newCoordinates: DetectedRectangle) => {
    setScanner({
      detectedRectangle: newCoordinates,
    });
    setRectangleCoordinates(newCoordinates);
    setCroppedImage(image);
  };

  const onPressBack = () => {
    setScanner({
      detectedRectangle: undefined,
      image: undefined,
    });

    navigation.replace('HomeScreen');
  };

  const onPressUndo = () => setCroppedImage(undefined);

  const onPressDone = () => {
    if (selectedImage !== -1 && croppedImage) {
      updateImage(selectedImage, {
        initialImage,
        croppedImage,
      });

      updateDetectedRectangle(selectedImage, detectedRectangle);

      return;
    }

    if (!croppedImage) return;

    pushImage({
      initialImage,
      croppedImage,
    });

    pushDetectedRectangle(detectedRectangle);

    setScanner({
      detectedRectangle: undefined,
      image: undefined,
    });

    navigation.replace('HomeScreen');
  };

  const onPressCrop = () => cropRef.current?.crop?.();

  return (
    <View style={globalStyle.mainContainer}>
      <View style={styles.container}>
        {!croppedImage ? (
          <CustomCrop
            updateImage={onUpdateImage}
            rectangleCoordinates={rectangleCoordinates}
            initialImage={initialImage}
            height={height}
            width={width}
            overlayStrokeWidth={1}
            overlayColor="rgba(18,190,210, 0.4)"
            overlayStrokeColor="rgba(20,180,255, 1)"
            handlerColor="rgba(20,150,160, 1)"
            handlerRoundSize={15}
            handlerRoundOuterSize={0.5}
            topOffset={10}
            bottomOffset={10}
            ref={
              cropRef as unknown as React.RefObject<Component<CustomCropProps>>
            }
          />
        ) : (
          <Image
            style={[
              globalStyle.croppedImage,
              height < width ? globalStyle.croppedImageRot : {},
            ]}
            source={{ uri: `data:image/png;base64,${croppedImage}` }}
          />
        )}
      </View>
      <View style={globalStyle.buttonBottomContainer}>
        <View style={controlStyle.buttonGroup}>
          <TouchableOpacity
            style={controlStyle.button}
            onPress={croppedImage ? onPressUndo : onPressBack}
          >
            <Icon
              name="ios-arrow-undo-circle"
              size={40}
              style={controlStyle.buttonIcon}
            />
            <Text style={controlStyle.buttonText}>
              {croppedImage ? 'Undo' : 'Back'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={controlStyle.buttonGroup}>
          <TouchableOpacity
            style={[controlStyle.button, { marginTop: 8 }]}
            activeOpacity={0.8}
            onPress={croppedImage ? onPressDone : onPressCrop}
          >
            <Icon
              name={croppedImage ? 'ios-checkmark-circle' : 'ios-crop-sharp'}
              size={40}
              color="white"
              style={controlStyle.buttonIcon}
            />
            <Text style={controlStyle.buttonText}>
              {croppedImage ? 'Done' : 'Crop'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  ...getCropState(state),
  selectedImage: getSelectedImageIndex(state),
});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
  updateImage: updateImage,
  updateDetectedRectangle: _updateDetectedRectangle,
  pushImage: _pushImage,
  pushDetectedRectangle: _pushDetectedRectangle,
});

type Props = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connector(CropScreen);
