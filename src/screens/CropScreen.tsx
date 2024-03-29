import _ from 'lodash';
import React, { useCallback, useState, useRef, Component } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  BackHandler,
} from 'react-native';
import CustomCrop, {
  CustomCropProps,
  CustomCropView,
} from 'react-native-perspective-image-cropper';
import { connect, ConnectedProps } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
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
import {
  MainNavigationScreenNavigation,
  MainNavigationScreenRoute,
} from '../types/Navigation';
import { SCREEN_NAME } from '../utils/constant';

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
  const route = useRoute<MainNavigationScreenRoute<'CropScreen'>>();

  const [initialImage] = useState(image?.initialImage);
  const [rectangleCoordinates, setRectangleCoordinates] =
    useState(detectedRectangle);
  const [{ height, width }] = useState(detectedRectangle?.dimensions);
  const [croppedImage, setCroppedImage] = useState<string>();
  const cropRef = useRef<CustomCropView>();

  const onUpdateImage: CustomCropProps['updateImage'] = (
    image,
    newCoordinates
  ) => {
    const detectedRectangle = {
      ..._.omit(newCoordinates, ['width', 'height']),
      dimensions: {
        width: newCoordinates.width,
        height: newCoordinates.height,
      },
    };

    setScanner({
      detectedRectangle,
    });
    setRectangleCoordinates(detectedRectangle);
    setCroppedImage(image);
  };

  const onPressBack = () => {
    setScanner({
      detectedRectangle: undefined,
      selectedImage: -1,
      image: undefined,
    });

    navigation.replace(route.params.from ?? SCREEN_NAME.COLLECTION);
  };

  const onPressUndo = () => setCroppedImage(undefined);

  const onPressDone = () => {
    if (!croppedImage) return;

    if (selectedImage !== -1) {
      updateImage(selectedImage, {
        initialImage,
        croppedImage,
      });

      updateDetectedRectangle(selectedImage, detectedRectangle);
    } else {
      pushImage({
        initialImage,
        croppedImage,
      });

      pushDetectedRectangle(detectedRectangle);
    }

    setScanner({
      detectedRectangle: undefined,
      selectedImage: -1,
      image: undefined,
    });

    navigation.replace(route.params.from ?? SCREEN_NAME.HOME);
  };

  const onPressCrop = () => cropRef.current?.crop?.();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (croppedImage) onPressUndo();
        else onPressBack();

        return true;
      };

      const subs = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subs.remove();
    }, [croppedImage]) // eslint-disable-line react-hooks/exhaustive-deps
  );

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
            overlayColor="rgba(255,181,6, 0.2)"
            overlayStrokeColor="rgb(255,181,6)"
            handlerOuterColor="rgba(255,181,6, 0.3)"
            handlerColor="rgb(255,218,124)"
            borderColor={'rgba(255,181,6, 0.3)'}
            handlerRoundSize={15}
            handlerRoundOuterSize={0.5}
            ref={
              cropRef as unknown as React.RefObject<Component<CustomCropProps>>
            }
          />
        ) : (
          <Image
            style={[globalStyle.croppedImage]}
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
