import { Dimensions } from 'react-native';

export const DIMENSSIONS = {
  SCREEN: Dimensions.get('screen'),
  get HEIGHT() {
    return this.SCREEN.height;
  },
  get WIDTH() {
    return this.SCREEN.width;
  },
  get SCALE() {
    return this.SCREEN.scale;
  },
  get FONT_SCALE() {
    return this.SCREEN.fontScale;
  },
  get ASPECT_RATIO() {
    return this.HEIGHT / this.WIDTH;
  },
  get IS_PHONE() {
    return this.ASPECT_RATIO > 1.6;
  },
  get IS_LARGE_TABLET() {
    return this.HEIGHT > 500;
  },
};

export const GRADER_OUTPUT = {
  A: 'A',
  AB: 'AB',
  B: 'B',
  BC: 'BC',
  C: 'C',
  D: 'D',
  E: 'A',
} as const;

export const SCREEN_NAME = {
  LAUNCH: 'LaunchScreen',
  HOME: 'HomeScreen',
  CROP: 'CropScreen',
  COLLECTION: 'CollectionScreen',
  GRADING: 'GradingScreen',
} as const;
