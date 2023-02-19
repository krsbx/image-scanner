declare module 'react-native-perspective-image-cropper' {
  import { ComponentClass } from 'react';
  import { View } from 'react-native';
  import { DetectedRectangle } from 'react-native-rectangle-scanner';

  export interface Coordinate {
    x: number;
    y: number;
  }

  export interface Offset {
    horizontal: number;
    vertical: number;
  }

  export interface CustomCropProps {
    overlayColor?: string;
    overlayOpacity?: number;
    overlayStrokeColor?: string;
    overlayStrokeWidth?: number;

    borderColor?: string;
    handlerColor?: string;
    handlerOuterColor?: string;
    handlerRoundSize?: number;
    handlerRoundOuterSize?: number;

    topOffset?: {
      left: Offset;
      right: Offset;
    };
    bottomOffset?: {
      left: Offset;
      right: Offset;
    };

    height: number;
    path?: string;
    rectangleCoordinates?: DetectedRectangle;
    initialImage: string;
    updateImage: (
      path: string,
      coordinates: Omit<DetectedRectangle, 'dimensions'> &
        DetectedRectangle['dimensions']
    ) => void;
    width: number;
  }

  export interface CustomCropView extends ComponentClass<CustomCropProps> {
    crop: () => void;
  }

  const CustomCrop: ComponentClass<CustomCropProps>;

  export default CustomCrop;
}
