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
  DELETE_MARKER: narrow('DELETE_MARKER'),
  DELETE_LABEL: narrow('DELETE_LABEL'),
};
export const ACTIONS_TYPE = AT;

const AC = {
  setActiveMarker: (payload: string) => ({ type: AT.SET_ACTIVE_MARKER, payload }),
  createMarker: (payload: Marker) => ({ type: AT.CREATE_MARKER, payload }),
  initializationMarkers: (payload: Markers) => ({ type: AT.INITIALIZATION_MARKERS, payload }),
  addLabel: (payload: MarkerCortege) => ({ type: AT.ADD_LABEL, payload }),
  setMap: (payload: GMaps_Map) => ({ type: AT.SET_MAP, payload }),
  editLabelTitle: (payload: EditLabelData) => ({ type: AT.EDIT_LABEL_TITLE, payload }),
  editMarkerTitle: (payload: EditMarkerData) => ({ type: AT.EDIT_MARKER_TITLE, payload }),
  deleteMarker: (payload: string) => ({ type: AT.DELETE_MARKER, payload }),
  deleteLabel: (payload: MarkerCortege) => ({ type: AT.DELETE_LABEL, payload }),
};
export const ACTIONS_CREATORS = AC;

export type Actions =
  | ReturnType<typeof AC['setActiveMarker']>
  | ReturnType<typeof AC['createMarker']>
  | ReturnType<typeof AC['initializationMarkers']>
  | ReturnType<typeof AC['addLabel']>
  | ReturnType<typeof AC['setMap']>
  | ReturnType<typeof AC['editLabelTitle']>
  | ReturnType<typeof AC['editMarkerTitle']>
  | ReturnType<typeof AC['deleteMarker']>
  | ReturnType<typeof AC['deleteLabel']>;

