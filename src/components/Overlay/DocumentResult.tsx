import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getGraderInput, getGraderOutput } from '../../store/selectors/grader';
import { getStoredDetectedRectangles } from '../../store/selectors/scanner';
import { globalStyle } from '../../styles';
import { DIMENSSIONS } from '../../utils/constant';

const DocumentResult: React.FC<Props> = ({
  imageResult,
  croppedImage,
  detectedRectangle,
  onPressOutside,
}) => {
  const { dimensions } = detectedRectangle;

  return (
    <View style={[styles.overlay]}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          position: 'absolute',
        }}
        activeOpacity={0}
        onPress={onPressOutside}
      />
      <Image
        source={{ uri: `data:image/png;base64,${croppedImage}` }}
        style={[
          globalStyle.croppedImage,
          dimensions.height < dimensions.width
            ? globalStyle.croppedImageRot
            : {},
        ]}
      />
      <View style={styles.resultContainer}>
        <Text style={[styles.gradeText]}>
          Grade : {imageResult?.score ?? 'NULL'}
        </Text>
        <Text style={[styles.gradeText, styles.gradeTimeText]}>
          Time Needed : {(imageResult?.times ?? 0).toFixed(3)} ms
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (
  state: AppState,
  { imageIndex }: { imageIndex: number }
) => ({
  detectedRectangle: getStoredDetectedRectangles(state)[imageIndex],
  croppedImage: getGraderInput(state)[imageIndex].image,
  imageResult: getGraderOutput(state)[imageIndex],
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  onPressOutside?: () => void;
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: DIMENSSIONS.HEIGHT * 0.05,
    left: 0,
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  resultContainer: {
    position: 'absolute',
    bottom: DIMENSSIONS.HEIGHT * 0.1,
    alignItems: 'center',
  },
  gradeText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradeTimeText: {
    paddingTop: 5,
    fontSize: 16,
  },
});

export default connector(DocumentResult);
