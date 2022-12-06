import { LogicSlice } from '../../../../types/state-manager';
import { Actions, ACTIONS_TYPE as AsT } from '../../actions/actions';

export const logicReducer = (state: LogicSlice, action: Actions): LogicSlice => {
  switch (action.type) {

    case AsT['SET_ACTIVE_MARKER']:
      return { ...state, activeMarker: action.payload };

    case AsT['SET_MAP']:
      return { ...state, map: action.payload };

    default: return state;

  }
};
