import _ from 'lodash';
import {
  ScannerActionType as ActionType,
  ScannerReducer,
  DeleteDetectedRectangle,
  DeleteImage,
  DeleteScanner,
  PushDetectedRectangle,
  PushImage,
  SetScanner,
  SetSelectedImage,
  UpdateDetectedRectangle,
  UpdateImage,
} from '../actions-types/scanner';

const initialState: ScannerReducer = {
  selectedImage: -1,

  detectedRectangle: undefined,
  image: undefined,

  detectedRectangles: [],
  images: [],

  didLoadInitialLayout: false,

  isFlashEnabled: false,
  isLoadingCamera: false,
  isMultiTasking: false,
  isOnScannerView: false,
  isProcessingImage: false,
  isTakingPicture: false,
};

const reducer = (
  state = _.cloneDeep(initialState),
  actions:
    | DeleteDetectedRectangle
    | DeleteImage
    | DeleteScanner
    | PushDetectedRectangle
    | PushImage
    | SetScanner
    | SetSelectedImage
    | UpdateDetectedRectangle
    | UpdateImage
): ScannerReducer => {
  switch (actions.type) {
    // ---- GLOBAL ---- //

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
      return _.cloneDeep(state);
    }

    // ---- SELECTOR ---- //

    case ActionType.SET_SELECTED_IMAGE: {
      return {
        ...state,
        selectedImage: actions.payload,
      };
    }

    // ---- PUSH ---- //

    case ActionType.PUSH_IMAGE: {
      state.images.push(actions.payload);

      return state;
    }

    case ActionType.PUSH_DETECTED_RECTANGLE: {
      state.detectedRectangles.push(actions.payload);

      return state;
    }

    // ---- UPDATE ---- //

    case ActionType.UPDATE_IMAGE: {
      if (!state.images[actions.payload.index]) return state;

      state.images[actions.payload.index] = actions.payload.data;

      return state;
    }

    case ActionType.UPDATE_DETECTED_RECTANGLE: {
      if (!state.detectedRectangles[actions.payload.index]) return state;

      state.detectedRectangles[actions.payload.index] = actions.payload.data;

      return state;
    }

    case ActionType.DELETE_IMAGE: {
      if (!state.images[actions.payload]) return state;

      state.images.splice(actions.payload, 1);

      return state;
    }

    case ActionType.DELETE_DETECTED_RECTANGLE: {
      if (!state.detectedRectangles[actions.payload]) return state;

      state.detectedRectangles.splice(actions.payload, 1);

      return state;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
