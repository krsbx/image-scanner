import _ from 'lodash';
import axios from '../store/axios';
import { GraderOutput } from '../store/actions-types/grader';

export const gradeImage = async (...image: string[]) => {
  try {
    const {
      data: { data },
    } = await axios.post<{
      code: number;
      status: string;
      data: GraderOutput[];
    }>(
      '/grades',
      _.reduce(
        image,
        (prev, curr, key) => ({
          ...prev,
          [key]: curr,
        }),
        {} as Record<string, string>
      )
    );

    return [data, null] as const;
  } catch (err) {
    return [null, err] as const;
  }
};

export const getDefaultRectangle = (width: number, height: number) => ({
  bottomLeft: {
    x: width * 0.25 || 0,
    y: height * 0.75 || 0,
  },
  bottomRight: {
    x: width * 0.75 || 0,
    y: height * 0.75 || 0,
  },
  topLeft: {
    x: width * 0.25 || 0,
    y: height * 0.25 || 0,
  },
  topRight: {
    x: width * 0.75 || 0,
    y: height * 0.25 || 0,
  },
  dimensions: {
    height,
    width,
  },
});
