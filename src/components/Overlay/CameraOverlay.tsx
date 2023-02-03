import React from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { getScanner } from '../../store/selectors/scanner';
import { overlayStyle } from '../../styles';
import LoadingCamera from '../Message/Loading/LoadingCamera';
import ProcessingImage from '../Message/Loading/ProcessingImage';
import CameraControl from './CameraControl';

const CameraOverlay: React.FC<Props> = ({ capture, scanner }) => {
  const { isLoadingCamera, isProcessingImage } = scanner;

  return (
    <React.Fragment>
      {!isLoadingCamera ? null : isProcessingImage ? (
        <ProcessingImage />
      ) : (
        <LoadingCamera />
      )}
      <View style={overlayStyle.container}>
        <CameraControl capture={capture} />
      </View>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  scanner: getScanner(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  capture: () => void;
};

export default connector(CameraOverlay);
