import _ from 'lodash';
import {
  GraderReducer,
  GraderActionType as ActionType,
  PushInput,
  PushOutput,
  UpdateInput,
  UpdateOutput,
  DeleteInput,
  DeleteOutput,
  SetGrader,
  UpdateGrader,
} from '../actions-types/grader';

const initialState: GraderReducer = {
  input: [],
  output: [],

  isOnGrading: false,
};

const reducer = (
  state = _.cloneDeep(initialState),
  actions:
    | PushInput
    | PushOutput
    | UpdateInput
    | UpdateOutput
    | DeleteInput
    | DeleteOutput
    | SetGrader
    | UpdateGrader
): GraderReducer => {
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

    // ---- PUSH ---- //

    case ActionType.PUSH_INPUT: {
      return {
        ...state,
        input: [...state.input, actions.payload],
      };
    }

    case ActionType.PUSH_OUTPUT: {
      return {
        ...state,
        output: [...state.output, actions.payload],
      };
    }

    // ---- UPDATE ---- //

    case ActionType.UPDATE_INPUT: {
      if (_.isEmpty(state.input[actions.payload.index]))
        return {
          ...state,
          input: [...state.input, actions.payload.data],
        };

      state.input[actions.payload.index] = actions.payload.data;

      return {
        ...state,
        input: [...state.input],
      };
    }

    case ActionType.UPDATE_OUTPUT: {
      if (_.isEmpty(state.output[actions.payload.index]))
        return {
          ...state,
          output: [...state.output, actions.payload.data],
        };

      state.output[actions.payload.index] = actions.payload.data;

      return {
        ...state,
        output: [...state.output],
      };
    }

    // ---- DELETE ---- //

    case ActionType.DELETE_INPUT: {
      if (_.isEmpty(state.input[actions.payload])) return state;

      if (state.input.length === 1)
        return {
          ...state,
          input: [],
        };

      state.input.splice(actions.payload, 1);

      return {
        ...state,
        input: [...state.input],
      };
    }

    case ActionType.DELETE_OUTPUT: {
      if (_.isEmpty(state.output[actions.payload])) return state;

      if (state.output.length === 1)
        return {
          ...state,
          output: [],
        };

      state.output.splice(actions.payload, 1);

      return {
        ...state,
        output: [...state.output],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
