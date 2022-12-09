import type {
  EditMarkerData,
  MarkerCortege,
  EditLabelData,
  Location,
  Markers,
  Marker
} from '../../../types/marker';
import type { Ready } from '../../../types/state-manager';

import { narrowStringType as narrow } from '../../../helpers/utils/utils';


const AT = {
  INITIALIZATION_MARKERS: narrow('INITIALIZATION_MARKERS'),
  EDIT_MARKER_TITLE: narrow('EDIT_MARKER_TITLE'),
  SET_ACTIVE_MARKER: narrow('SET_ACTIVE_MARKER'),
  EDIT_LABEL_TITLE: narrow('EDIT_LABEL_TITLE'),
  SET_MAP_CENTER: narrow('SET_MAP_CENTER'),
  DELETE_MARKER: narrow('DELETE_MARKER'),
  CREATE_MARKER: narrow('CREATE_MARKER'),
  DELETE_LABEL: narrow('DELETE_LABEL'),
  APP_READY: narrow('APP_READY'),
  ADD_LABEL: narrow('ADD_LABEL'),
};
export const ACTIONS_TYPE = AT;


const AC = {
  initializationMarkers: (payload: Markers) => ({ type: AT.INITIALIZATION_MARKERS, payload }),
  editMarkerTitle: (payload: EditMarkerData) => ({ type: AT.EDIT_MARKER_TITLE, payload }),
  editLabelTitle: (payload: EditLabelData) => ({ type: AT.EDIT_LABEL_TITLE, payload }),
  setActiveMarker: (payload: string) => ({ type: AT.SET_ACTIVE_MARKER, payload }),
  deleteLabel: (payload: MarkerCortege) => ({ type: AT.DELETE_LABEL, payload }),
  setMapCenter: (payload: Location) => ({ type: AT.SET_MAP_CENTER, payload }),
  deleteMarker: (payload: string) => ({ type: AT.DELETE_MARKER, payload }),
  createMarker: (payload: Marker) => ({ type: AT.CREATE_MARKER, payload }),
  addLabel: (payload: MarkerCortege) => ({ type: AT.ADD_LABEL, payload }),
  changeReady: (payload: Ready) => ({ type: AT.APP_READY, payload }),
};
export const ACTIONS_CREATORS = AC;


export type Actions =
  | ReturnType<typeof AC['initializationMarkers']>
  | ReturnType<typeof AC['editMarkerTitle']>
  | ReturnType<typeof AC['setActiveMarker']>
  | ReturnType<typeof AC['editLabelTitle']>
  | ReturnType<typeof AC['createMarker']>
  | ReturnType<typeof AC['setMapCenter']>
  | ReturnType<typeof AC['deleteMarker']>
  | ReturnType<typeof AC['deleteLabel']>
  | ReturnType<typeof AC['changeReady']>
  | ReturnType<typeof AC['addLabel']>;
