import _ from 'lodash';
import {
  DeviceActionType as ActionType,
  DeviceReducer,
  ResetDevice,
  SetDevice,
} from '../actions-types/device';

const initialState: DeviceReducer = {
  initialized: false,
  isHasCamera: false,
  isHasCameraAccess: false,
  isFlashAvailable: false,
  previewHeightPercent: 1,
  previewWidthPercent: 1,
};

const reducer = (
  state = _.cloneDeep(initialState),
  actions: SetDevice | ResetDevice
): DeviceReducer => {
  switch (actions.type) {
    case ActionType.SET: {
      if (typeof actions.payload === 'function')
        return {
          ...state,
          ...actions.payload(state),
        };

      return {
        ...state,
        ...actions.payload,
      };
    }

    case ActionType.RESET: {
      return _.cloneDeep(initialState);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
