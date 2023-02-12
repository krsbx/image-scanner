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
