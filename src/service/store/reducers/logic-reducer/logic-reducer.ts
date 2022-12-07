import type { LogicSlice } from '../../../../types/state-manager';

import { Actions, ACTIONS_TYPE as AsT } from '../../actions/actions';


export const logicReducer = (state: LogicSlice, action: Actions): LogicSlice => {
  switch (action.type) {

    case AsT['SET_ACTIVE_MARKER']:
      return { ...state, activeMarker: action.payload };

    case AsT['SET_MAP_CENTER']:
      return { ...state, center: action.payload };

    case AsT['APP_READY']:
      return { ...state, isReady: action.payload };


    default: return state;

  }
};
