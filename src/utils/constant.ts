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

export const DEFAULT_RECTANGLE = (width: number, height: number) => ({
  bottomLeft: {
    x: Math.floor(width / 4) || 0,
    y: Math.floor(height / 4) || 0,
  },
  bottomRight: {
    x: Math.floor(width / 2) || 0,
    y: Math.floor(height / 4) || 0,
  },
  topLeft: {
    x: Math.floor(width / 4) || 0,
    y: Math.floor(height / 2) || 0,
  },
  topRight: {
    x: Math.floor(width / 2) || 0,
    y: Math.floor(height / 2) || 0,
  },
  dimensions: {
    height,
    width,
  },
});
