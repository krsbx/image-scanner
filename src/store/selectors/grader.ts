import { AppState } from '..';

export const getGrader = (state: AppState) => state.grader;

export const getGraderInput = (state: AppState) => state.grader.input;

export const getGraderOutput = (state: AppState) => state.grader.output;
