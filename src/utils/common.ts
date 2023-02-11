import axios from 'axios';
import { GraderOutput } from '../store/actions-types/grader';

export const gradeImage = async (image: string) => {
  try {
    const {
      data: { data },
    } = await axios.post<{
      code: number;
      status: string;
      data: GraderOutput[];
    }>(
      '/grades',
      {
        image,
      },
      {
        baseURL: 'http://192.168.18.185:3001',
      }
    );

    return [data[0], null] as const;
  } catch (err) {
    return [null, err] as const;
  }
};
