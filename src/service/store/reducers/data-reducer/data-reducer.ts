import { DataSlice } from '../../../../types/state-manager';
import { Actions, ACTIONS_TYPE as AsT } from '../../actions/actions';

export const dataReducer = (state: DataSlice, action: Actions): DataSlice => {

  switch (action.type) {

    case AsT['CREATE_MARKER']:
      return { markers: [...state.markers, action.payload] };

    case AsT['INITIALIZATION_MARKERS']:
      return { markers: action.payload };

    case AsT['ADD_LABEL']:
      const [marker, id] = action.payload;
      const markers = state.markers;
      markers.splice(id, 1, marker);
      return { markers };

    default: return state;

  }
};
