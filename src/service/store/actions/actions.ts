import { narrowStringType as narrow } from '../../../helpers/utils';
import { EditLabelData, EditMarkerData, Marker, MarkerCortege, Markers } from '../../../types/marker';
import { GMaps_Map } from '../../../types/types';


const AT = {
  SET_ACTIVE_MARKER: narrow('SET_ACTIVE_MARKER'),
  CREATE_MARKER: narrow('CREATE_MARKER'),
  INITIALIZATION_MARKERS: narrow('INITIALIZATION_MARKERS'),
  ADD_LABEL: narrow('ADD_LABEL'),
  SET_MAP: narrow('SET_MAP'),
  EDIT_LABEL_TITLE: narrow('EDIT_LABEL_TITLE'),
  EDIT_MARKER_TITLE: narrow('EDIT_MARKER_TITLE'),
};
export const ACTIONS_TYPE = AT;

export const ACTIONS_CREATORS = {
  setActiveMarker: (payload: string) => ({ type: AT.SET_ACTIVE_MARKER, payload }),
  createMarker: (payload: Marker) => ({ type: AT.CREATE_MARKER, payload }),
  initializationMarkers: (payload: Markers) => ({ type: AT.INITIALIZATION_MARKERS, payload }),
  addLabel: (payload: MarkerCortege) => ({ type: AT.ADD_LABEL, payload }),
  setMap: (payload: GMaps_Map) => ({ type: AT.SET_MAP, payload }),
  editLabelTitle: (payload: EditLabelData) => ({ type: AT.EDIT_LABEL_TITLE, payload }),
  editMarkerTitle: (payload: EditMarkerData) => ({ type: AT.EDIT_MARKER_TITLE, payload }),
};

export type Actions =
  | ReturnType<typeof ACTIONS_CREATORS['setActiveMarker']>
  | ReturnType<typeof ACTIONS_CREATORS['createMarker']>
  | ReturnType<typeof ACTIONS_CREATORS['initializationMarkers']>
  | ReturnType<typeof ACTIONS_CREATORS['addLabel']>
  | ReturnType<typeof ACTIONS_CREATORS['setMap']>
  | ReturnType<typeof ACTIONS_CREATORS['editLabelTitle']>
  | ReturnType<typeof ACTIONS_CREATORS['editMarkerTitle']>
