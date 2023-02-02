import { AppDispatch } from '..';
import { DeviceActionType, DeviceReducer } from '../actions-types/device';

export const setDevice =
  <T extends Partial<DeviceReducer>>(
    payload: T | ((prev: DeviceReducer) => T)
  ) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: DeviceActionType.SET,
      payload,
    });

export const resetDevice = () => (dispatch: AppDispatch) =>
  dispatch({
    type: DeviceActionType.RESET,
  });
