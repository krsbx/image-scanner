export type DeviceReducer = {
  initialized: boolean;
  isHasCamera: boolean;
  isHasCameraAccess: boolean;
  isFlashAvailable: boolean;
  previewHeightPercent: number;
  previewWidthPercent: number;
};

export enum DeviceActionType {
  SET = 'device.set',
  RESET = 'device.reset',
}

export type SetDevice<T = DeviceReducer, U = Partial<T>> = {
  type: DeviceActionType.SET;
  payload: U | ((prev: T) => U);
};

export type ResetDevice = {
  type: DeviceActionType.RESET;
};
