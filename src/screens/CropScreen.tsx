import React, { useState, useRef, Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomCrop, {
  CustomCropProps,
  CustomCropView,
} from 'react-native-perspective-image-cropper';
import { DetectedRectangle } from 'react-native-rectangle-scanner';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../store';
import { setScanner as _setScanner } from '../store/actions/scanner';
import { getCropState } from '../store/selectors/scanner';

const CropScreen: React.FC<Props> = ({
  setScanner,
  image,
  detectedRectangle,
}) => {
  const [initialImage] = useState(image?.initialImage);
  const [rectangleCoordinates, setRectangleCoordinates] =
    useState(detectedRectangle);
  const [{ height, width }] = useState(detectedRectangle?.dimensions);
  const [croppedImage, setCroppedImage] = useState<string>();
  const cropRef = useRef<CustomCropView>();

  const updateImage = (image: string, newCoordinates: DetectedRectangle) => {
    setScanner({
      detectedRectangle: newCoordinates,
    });
    setRectangleCoordinates(newCoordinates);
    setCroppedImage(image);
  };

  const onPressUndo = () => setCroppedImage(undefined);

  const onPressDone = () => {
    console.log(croppedImage);
  };

  const onPressCrop = () => cropRef.current?.crop?.();

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 1)',
        flex: 1,
      }}
    >
      {!croppedImage ? (
        <CustomCrop
          updateImage={updateImage}
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
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            style={[styles.croppedImage]}
            source={{ uri: `data:image/png;base64,${croppedImage}` }}
          />
        </View>
      )}

      <View style={[styles.buttonContainer, { marginBottom: 15 }]}>
        <TouchableOpacity
          disabled={croppedImage ? false : true}
          style={[
            styles.button,
            {
              backgroundColor: croppedImage
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(255, 255, 255, 0.3)',
            },
          ]}
          activeOpacity={0.5}
          onPress={onPressUndo}
        >
          <Text style={[styles.buttonText]}>UNDO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: 'rgba(255, 255, 255, 0.6)' },
          ]}
          activeOpacity={0.5}
          onPress={croppedImage ? onPressDone : onPressCrop}
        >
          <Text style={[styles.buttonText]}>
            {croppedImage ? 'DONE' : 'CROP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  ...getCropState(state),
});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 10,
  },
  croppedImage: {
    height: '40%',
    width: '100%',
    resizeMode: 'contain',
    transform: [{ rotate: '-90deg' }],
  },
  button: {
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 150,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default connector(CropScreen);
