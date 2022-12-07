import type { DataSlice } from '../../../../types/state-manager';

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

    case AsT['EDIT_LABEL_TITLE']:
      const { label, m_inx: marker_index, l_inx } = action.payload;
      state.markers[marker_index]['labels'][l_inx] = label;
      return { markers: state.markers };

    case AsT['EDIT_MARKER_TITLE']:
      const { marker: mrkr, m_inx } = action.payload;
      state.markers[m_inx] = mrkr;
      return { markers: state.markers };

    case AsT['DELETE_MARKER']:
      const Markers = state.markers.filter(m => m.id !== action.payload);
      return { markers: Markers };

    case AsT['DELETE_LABEL']:
      const [new_marker, index] = action.payload;
      const new_markers = state.markers;
      new_markers.splice(index, 1, new_marker);
      return { markers: new_markers };

    default: return state;

  }
};
