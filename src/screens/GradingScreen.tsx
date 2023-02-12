import React, { useCallback, useState } from 'react';
import { BackHandler, TouchableOpacity, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MainNavigationScreenNavigation } from '../types/Navigation';
import { AppState } from '../store';
import { getGrader } from '../store/selectors/grader';
import { setScanner as _setScanner } from '../store/actions/scanner';
import { DIMENSSIONS, SCREEN_NAME } from '../utils/constant';
import { controlStyle, globalStyle } from '../styles';
import ScannedDocument from '../components/ScannedDocument';
import { getStoredDetectedRectangles } from '../store/selectors/scanner';
import DocumentResult from '../components/Overlay/DocumentResult';

const GradingScreen: React.FC<Props> = ({
  input,
  output,
  detectedRectangles,
  setScanner,
}) => {
  const navigation =
    useNavigation<MainNavigationScreenNavigation<'CollectionScreen'>>();

  const [selectedImage, setSelectedImage] = useState(-1);

  const onPressOnClose = () => setSelectedImage(-1);
  const onPressOnBack = () => {
    setScanner({
      image: undefined,
      detectedRectangle: undefined,
      croppedImages: [],
      detectedRectangles: [],
      images: [],
    });

    navigation.replace(SCREEN_NAME.HOME);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedImage > -1) onPressOnClose();
        else onPressOnBack();

        return true;
      };

      const subs = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subs.remove();
    }, [input, output, selectedImage])
  );

  return (
    <View style={[globalStyle.mainContainer, { position: 'relative' }]}>
      <View style={[{ height: DIMENSSIONS.HEIGHT * 0.85 }]}>
        <FlatGrid
          itemDimension={90}
          data={input}
          style={[{ height: '90%' }]}
          renderItem={({ item, index }) => (
            <ScannedDocument
              croppedImage={item.image}
              detectedRectangle={detectedRectangles[index]}
              withClose={false}
              onPressOnImage={() => setSelectedImage(index)}
              key={`collections-${index}`}
            />
          )}
        />
      </View>
      {selectedImage > -1 ? (
        <DocumentResult
          imageIndex={selectedImage}
          onPressOutside={onPressOnClose}
        />
      ) : null}
      <View
        style={[
          globalStyle.buttonBottomContainer,
          { justifyContent: 'center' },
        ]}
      >
        <TouchableOpacity
          style={[controlStyle.button]}
          activeOpacity={0.8}
          onPress={selectedImage > -1 ? onPressOnClose : onPressOnBack}
        >
          <Icon
            name="ios-arrow-undo-circle"
            size={40}
            style={controlStyle.buttonIcon}
          />
          <Text style={controlStyle.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  ...getGrader(state),
  detectedRectangles: getStoredDetectedRectangles(state),
});

const connector = connect(mapStateToProps, {
  setScanner: _setScanner,
});

type Props = ConnectedProps<typeof connector>;

export default connector(GradingScreen);
