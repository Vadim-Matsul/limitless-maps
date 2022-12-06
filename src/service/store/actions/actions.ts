import { narrowStringType as narrow } from '../../../helpers/utils';
import { Location, Marker, MarkerCenterData, MarkerCortege, Markers } from '../../../types/marker';
import { GMaps_Map } from '../../../types/types';


export const ACTIONS_TYPE = {
  SET_ACTIVE_MARKER: narrow('SET_ACTIVE_MARKER'),
  CREATE_MARKER: narrow('CREATE_MARKER'),
  INITIALIZATION_MARKERS: narrow('INITIALIZATION_MARKERS'),
  ADD_LABEL: narrow('ADD_LABEL'),
  SET_MAP: narrow('SET_MAP'),
  SET_MAP_CENTER: narrow('SET_MAP_CENTER'),
};

export const ACTIONS_CREATORS = {
  setActiveMarker: (payload: string) => ({ type: ACTIONS_TYPE.SET_ACTIVE_MARKER, payload }),
  createMarker: (payload: Marker) => ({ type: ACTIONS_TYPE.CREATE_MARKER, payload }),
  initializationMarkers: (payload: Markers) => ({ type: ACTIONS_TYPE.INITIALIZATION_MARKERS, payload }),
  addLabel: (payload: MarkerCortege) => ({ type: ACTIONS_TYPE.ADD_LABEL, payload }),
  setMap: (payload: GMaps_Map) => ({ type: ACTIONS_TYPE.SET_MAP, payload }),
  setMapCenter: (payload: MarkerCenterData) => ({ type: ACTIONS_TYPE.SET_MAP_CENTER, payload }),
};

export type Actions =
  | ReturnType<typeof ACTIONS_CREATORS['setActiveMarker']>
  | ReturnType<typeof ACTIONS_CREATORS['createMarker']>
  | ReturnType<typeof ACTIONS_CREATORS['initializationMarkers']>
  | ReturnType<typeof ACTIONS_CREATORS['addLabel']>
  | ReturnType<typeof ACTIONS_CREATORS['setMap']>
  | ReturnType<typeof ACTIONS_CREATORS['setMapCenter']>

