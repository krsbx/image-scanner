import PdfThumbnail from 'react-native-pdf-thumbnail';
import RNPhotoManipulator from 'react-native-photo-manipulator';

export const optimizeImage = (filePath: string, quality = 60) =>
  RNPhotoManipulator.optimize(filePath, quality);

export const generateThumbnail = (filePath: string, page = 0, quality = 60) =>
  PdfThumbnail.generate(filePath, page, quality);
