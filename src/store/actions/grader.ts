import _ from 'lodash';
import { AppDispatch } from '..';
import { gradeImage } from '../../utils/common';
import {
  GraderActionType,
  GraderReducer,
  GraderInput,
  GraderOutput,
} from '../actions-types/grader';

// ---- GLOBAL ---- //

export const setGrader =
  <T extends Partial<GraderReducer>>(
    payload: T | ((prev: GraderReducer) => T)
  ) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: GraderActionType.SET,
      payload,
    });

export const resetGrader = () => (dispatch: AppDispatch) =>
  dispatch({
    type: GraderActionType.RESET,
  });

export const gradeImages =
  (payload: GraderInput | GraderInput[]) => (dispatch: AppDispatch) => {
    const input = Array.isArray(payload) ? payload : [payload];

    dispatch({
      type: GraderActionType.SET,
      payload: {
        isOnGrading: true,
        input,
      },
    });

    return new Promise<GraderOutput[]>(async (resolve) => {
      try {
        const results: Awaited<ReturnType<typeof gradeImage>>[] = [];

        for (const [, { image }] of Object.entries(input))
          results.push(await gradeImage(image));

        const output = results.map(([result, err]) => result!);

        setTimeout(() => {
          dispatch({
            type: GraderActionType.SET,
            payload: {
              isOnGrading: false,
              output,
            },
          });

          resolve(output);
        }, 2000);
      } catch {
        dispatch({
          type: GraderActionType.SET,
          payload: {
            isOnGrading: false,
          },
        });
      }
    });
  };

// ---- PUSH ---- //

export const pushGraderInput =
  (payload: GraderInput) => (dispatch: AppDispatch) =>
    dispatch({
      type: GraderActionType.PUSH_INPUT,
      payload,
    });

export const pushGraderOutput =
  (payload: GraderOutput) => (dispatch: AppDispatch) =>
    dispatch({
      type: GraderActionType.PUSH_OUTPUT,
      payload,
    });

// ---- UPDATE ---- //

export const updateGraderInput =
  (index: number, data: GraderInput) => (dispatch: AppDispatch) =>
    dispatch({
      type: GraderActionType.UPDATE_INPUT,
      payload: {
        index,
        data,
      },
    });

export const updateGraderOutput =
  (index: number, data: GraderOutput) => (dispatch: AppDispatch) =>
    dispatch({
      type: GraderActionType.UPDATE_OUTPUT,
      payload: {
        index,
        data,
      },
    });

// ---- DELETE ---- //

export const deleteGraderInput = (payload: number) => (dispatch: AppDispatch) =>
  dispatch({
    type: GraderActionType.DELETE_INPUT,
    payload,
  });

export const deleteGraderOutput =
  (payload: number) => (dispatch: AppDispatch) =>
    dispatch({
      type: GraderActionType.DELETE_OUTPUT,
      payload,
    });
