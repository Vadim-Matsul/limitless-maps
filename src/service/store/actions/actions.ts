import { narrowStringType as narrow } from '../../../helpers/utils';
import { Marker, Markers } from '../../../types/marker';


export const ACTIONS_TYPE = {
  SET_ACTIVE_MARKER: narrow('SET_ACTIVE_MARKER'),
  CREATE_MARKER: narrow('CREATE_MARKER'),
  INITIALIZATION_MARKERS: narrow('INITIALIZATION_MARKERS'),
};

export const ACTIONS_CREATORS = {
  setActiveMarker: (payload: Marker) => ({ type: ACTIONS_TYPE.SET_ACTIVE_MARKER, payload }),
  createMarker: (payload: Marker) => ({ type: ACTIONS_TYPE.CREATE_MARKER, payload }),
  initializationMarkers: (payload: Markers) => ({ type: ACTIONS_TYPE.INITIALIZATION_MARKERS, payload }),
};

export type Actions =
  | ReturnType<typeof ACTIONS_CREATORS['setActiveMarker']>
  | ReturnType<typeof ACTIONS_CREATORS['createMarker']>
  | ReturnType<typeof ACTIONS_CREATORS['initializationMarkers']>


