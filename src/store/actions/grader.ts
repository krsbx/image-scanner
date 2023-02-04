import axios from 'axios';
import { AppDispatch } from '..';
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
  (payload: GraderInput | GraderInput[]) => async (dispatch: AppDispatch) => {
    dispatch({
      type: GraderActionType.SET,
      payload: {
        input: Array.isArray(payload) ? payload : [payload],
        isOnGrading: true,
      },
    });

    setTimeout(() => {
      dispatch({
        type: GraderActionType.SET,
        payload: {
          isOnGrading: false,
        },
      });
    }, 3000);

    // try {
    //   const { data } = await axios.post<GraderOutput[]>('USE .ENV', {
    //     images: Array.isArray(payload) ? payload : [payload],
    //   });

    //   dispatch({
    //     type: GraderActionType.SET,
    //     payload: {
    //       isOnGrading: false,
    //       output: data,
    //     },
    //   });
    // } catch {
    //   dispatch({
    //     type: GraderActionType.SET,
    //     payload: {
    //       isOnGrading: false,
    //     },
    //   });
    // }
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
