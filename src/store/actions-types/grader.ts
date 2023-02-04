import { GRADER_OUTPUT } from '../../utils/constant';

export type GraderInput = {
  image: string; // Base64 Cropped Image
};

export type GraderOutput = {
  score: ValueOf<typeof GRADER_OUTPUT>;
};

export type GraderReducer = {
  input: GraderInput[];
  output: GraderOutput[];
  isOnGrading: boolean;
};

export enum GraderActionType {
  SET = 'grader.set',
  RESET = 'grader.reset',

  PUSH_INPUT = 'grader.input.push',
  PUSH_OUTPUT = 'grader.ouput.push',

  UPDATE_INPUT = 'grader.input.update',
  UPDATE_OUTPUT = 'grader.output.update',

  DELETE_INPUT = 'grader.input.delete',
  DELETE_OUTPUT = 'grader.output.delete',
}

// ---- GLOBAL ---- //

export type SetGrader<T = GraderReducer, U = Partial<T>> = {
  type: GraderActionType.SET;
  payload: U | ((prev: T) => U);
};

export type UpdateGrader = {
  type: GraderActionType.RESET;
};

// ---- PUSH ---- //

export type PushInput = {
  type: GraderActionType.PUSH_INPUT;
  payload: GraderInput;
};

export type PushOutput = {
  type: GraderActionType.PUSH_OUTPUT;
  payload: GraderOutput;
};

// ---- UPDATE ---- //

export type UpdateInput = {
  type: GraderActionType.UPDATE_INPUT;
  payload: {
    index: number;
    data: GraderInput;
  };
};

export type UpdateOutput = {
  type: GraderActionType.UPDATE_OUTPUT;
  payload: {
    index: number;
    data: GraderOutput;
  };
};

// ---- DELETE ---- //

export type DeleteInput = {
  type: GraderActionType.DELETE_INPUT;
  payload: number;
};

export type DeleteOutput = {
  type: GraderActionType.DELETE_OUTPUT;
  payload: number;
};
