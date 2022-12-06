import { Dispatch } from 'react';
import { MapT } from '../components/map/types';
import { MarkersStorage } from '../helpers/sessionStorage';
import { Actions } from '../service/store/actions/actions';
import { Markers } from './marker';

export type A_Marker = string | null;

export type DataSlice = {
  markers: Markers;
};

export type LogicSlice = {
  activeMarker: A_Marker;
  map: MapT;
};

export type RootState = {
  data: DataSlice;
  logic: LogicSlice;
};

export type Scope = {
  markers: Markers;
  activeMarker: A_Marker;
  storage: MarkersStorage;
  map: MapT;
  dispatch: Dispatch<Actions>;
};
