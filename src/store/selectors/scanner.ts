import _ from 'lodash';
import { AppState } from '..';
import { getDefaultRectangle } from '../../utils/common';
import { DIMENSSIONS } from '../../utils/constant';

export const getScanner = (state: AppState) => state.scanner;

export const getSelectedImageIndex = (state: AppState) =>
  getScanner(state).selectedImage;

export const getLoadStatus = (state: AppState) =>
  getScanner(state).didLoadInitialLayout;

export const getFlashStatus = (state: AppState) =>
  getScanner(state).isFlashEnabled;

export const getCameraStatus = (state: AppState) =>
  getScanner(state).isLoadingCamera;

export const getScannerViewStatus = (state: AppState) =>
  getScanner(state).isOnScannerView;

export const getMultiTaskingStatus = (state: AppState) =>
  getScanner(state).isMultiTasking;

export const getImageProcessStatus = (state: AppState) =>
  getScanner(state).isProcessingImage;

export const getScannerStatus = (state: AppState) =>
  getScanner(state).isTakingPicture;

export const getStoredImages = (state: AppState) => getScanner(state).images;

export const getStoredDetectedRectangles = (state: AppState) =>
  getScanner(state).detectedRectangles;

export const getCameraDisabledStatus = (state: AppState) => {
  const { isTakingPicture, isProcessingImage } = getScanner(state);

  return isTakingPicture || isProcessingImage;
};

export const getTotalImage = (state: AppState) =>
  getScanner(state).images.length;

export const getCropState = (state: AppState) => {
  const { image, detectedRectangle } = getScanner(state);

  const defaultRect = getDefaultRectangle(
    DIMENSSIONS.WIDTH,
    DIMENSSIONS.HEIGHT
  );

  return {
    image: {
      croppedImage: image?.croppedImage ?? '',
      initialImage: image?.initialImage ?? '',
    },
    detectedRectangle: {
      bottomLeft: detectedRectangle?.bottomLeft ?? defaultRect.bottomLeft,
      bottomRight: detectedRectangle?.bottomRight ?? defaultRect.bottomRight,
      topLeft: detectedRectangle?.topLeft ?? defaultRect.topLeft,
      topRight: detectedRectangle?.topRight ?? defaultRect.topRight,
      dimensions: {
        height:
          detectedRectangle?.dimensions?.height ??
          defaultRect.dimensions.height,
        width:
          detectedRectangle?.dimensions?.width ?? defaultRect.dimensions.width,
      },
    },
  };
};
