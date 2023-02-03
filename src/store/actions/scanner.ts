import {
  DetectedRectangle,
  PictureCallbackProps,
} from 'react-native-rectangle-scanner';
import {
  ScannerActionType as ActionType,
  ScannerReducer,
} from '../actions-types/scanner';
import { AppDispatch } from '..';

// ---- GLOBAL ---- //

export const setScanner =
  <T extends Partial<ScannerReducer>>(
    payload: T | ((prev: ScannerReducer) => T)
  ) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: ActionType.SET,
      payload,
    });

export const resetScanner = () => (dispatch: AppDispatch) =>
  dispatch({
    type: ActionType.RESET,
  });

// ---- SELECTOR ---- //

export const setSelectedImage = (payload: number) => (dispatch: AppDispatch) =>
  dispatch({
    type: ActionType.SET_SELECTED_IMAGE,
    payload,
  });

// ---- PUSH ---- //

export const pushImage =
  (payload: PictureCallbackProps) => (dispatch: AppDispatch) =>
    dispatch({
      type: ActionType.PUSH_IMAGE,
      payload,
    });

export const pushDetectedRectangle =
  (payload: DetectedRectangle) => (dispatch: AppDispatch) =>
    dispatch({
      type: ActionType.PUSH_DETECTED_RECTANGLE,
      payload,
    });

// ---- UPDATE ---- //

export const updateImage =
  (index: number, data: PictureCallbackProps) => (dispatch: AppDispatch) =>
    dispatch({
      type: ActionType.UPDATE_IMAGE,
      payload: {
        index,
        data,
      },
    });

export const updateDetectedRectangle =
  (index: number, data: DetectedRectangle) => (dispatch: AppDispatch) =>
    dispatch({
      type: ActionType.UPDATE_DETECTED_RECTANGLE,
      payload: {
        index,
        data,
      },
    });

// ---- DELETE ---- //

export const deleteImage = (payload: number) => (dispatch: AppDispatch) =>
  dispatch({
    type: ActionType.DELETE_IMAGE,
    payload,
  });

export const deleteDetectedRectangle =
  (payload: number) => (dispatch: AppDispatch) =>
    dispatch({
      type: ActionType.DELETE_DETECTED_RECTANGLE,
      payload,
    });
