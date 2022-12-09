import type { Actions } from '../service/store/actions/actions';
import type { Location, Markers } from './marker';
import type { Dispatch } from 'react';

import MarkerData from '../helpers/storage/sessionStorage';


export type A_Marker = string | null;
export type Ready = boolean | null;

export type DataSlice = {
  markers: Markers;
};

export type LogicSlice = {
  activeMarker: A_Marker;
  center: Location;
  isReady: Ready;
};

export type RootState = {
  data: DataSlice;
  logic: LogicSlice;
};

export type Scope = {
  dispatch: Dispatch<Actions>;
  storage: MarkerData;
  activeMarker: A_Marker;
  markers: Markers;
  center: Location;
  isReady: Ready;
};
