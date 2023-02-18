import PdfThumbnail from 'react-native-pdf-thumbnail';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import axios from '../store/axios';
import { GraderOutput } from '../store/actions-types/grader';

export const gradeImage = async (image: string) => {
  try {
    const {
      data: { data },
    } = await axios.post<{
      code: number;
      status: string;
      data: GraderOutput[];
    }>('/grades', {
      image,
    });

    return [data[0], null] as const;
  } catch (err) {
    return [null, err] as const;
  }
};

export const optimizeImage = (filePath: string, quality = 60) =>
  RNPhotoManipulator.optimize(filePath, quality);

export const generateThumbnail = (filePath: string, page = 0, quality = 60) =>
  PdfThumbnail.generate(filePath, page, quality);
