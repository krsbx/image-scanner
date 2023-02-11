import _ from 'lodash';
import {
  ScannerActionType as ActionType,
  ScannerReducer,
  DeleteDetectedRectangle,
  DeleteCroppedImage,
  DeleteImage,
  DeleteScanner,
  PushDetectedRectangle,
  PushCroppedImage,
  PushImage,
  SetScanner,
  SetSelectedImage,
  UpdateDetectedRectangle,
  UpdateCroppedImage,
  UpdateImage,
} from '../actions-types/scanner';

const initialState: ScannerReducer = {
  selectedImage: -1,

  detectedRectangle: undefined,
  image: undefined,

  detectedRectangles: [],
  croppedImages: [],
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
    | DeleteCroppedImage
    | DeleteImage
    | DeleteScanner
    | PushDetectedRectangle
    | PushCroppedImage
    | PushImage
    | SetScanner
    | SetSelectedImage
    | UpdateDetectedRectangle
    | UpdateCroppedImage
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
      return {
        ...state,
        images: [...state.images, actions.payload],
      };
    }

    case ActionType.PUSH_CROPPED_IMAGE: {
      return {
        ...state,
        croppedImages: [...state.croppedImages, actions.payload],
      };
    }

    case ActionType.PUSH_DETECTED_RECTANGLE: {
      return {
        ...state,
        detectedRectangles: [...state.detectedRectangles, actions.payload],
      };
    }

    // ---- UPDATE ---- //

    case ActionType.UPDATE_IMAGE: {
      if (_.isEmpty(state.images[actions.payload.index]))
        return {
          ...state,
          images: [...state.images, actions.payload.data],
        };

      state.images[actions.payload.index] = actions.payload.data;

      return state;
    }

    case ActionType.UPDATE_CROPPED_IMAGE: {
      if (_.isEmpty(state.croppedImages[actions.payload.index]))
        return {
          ...state,
          croppedImages: [...state.croppedImages, actions.payload.data],
        };

      state.croppedImages[actions.payload.index] = actions.payload.data;

      return state;
    }

    case ActionType.UPDATE_DETECTED_RECTANGLE: {
      if (_.isEmpty(state.detectedRectangles[actions.payload.index]))
        return {
          ...state,
          detectedRectangles: [
            ...state.detectedRectangles,
            actions.payload.data,
          ],
        };

      state.detectedRectangles[actions.payload.index] = actions.payload.data;

      return state;
    }

    // ---- DELETE ---- //

    case ActionType.DELETE_IMAGE: {
      if (_.isEmpty(state.images[actions.payload])) return state;

      if (state.images.length === 1)
        return {
          ...state,
          images: [],
        };

      state.images.splice(actions.payload, 1);

      return {
        ...state,
        images: [...state.images],
      };
    }

    case ActionType.DELETE_CROPPED_RECTANGLE: {
      if (_.isEmpty(state.croppedImages[actions.payload])) return state;

      if (state.croppedImages.length === 1)
        return {
          ...state,
          croppedImages: [],
        };

      state.croppedImages.splice(actions.payload, 1);

      return {
        ...state,
        croppedImages: [...state.croppedImages],
      };
    }

    case ActionType.DELETE_DETECTED_RECTANGLE: {
      if (_.isEmpty(state.detectedRectangles[actions.payload])) return state;

      if (state.detectedRectangles.length === 1)
        return {
          ...state,
          detectedRectangles: [],
        };

      state.detectedRectangles.splice(actions.payload, 1);

      return {
        ...state,
        detectedRectangles: [...state.detectedRectangles],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
