import { Dispatch } from 'react';
import { MarkersStorage } from '../helpers/sessionStorage';
import { Actions } from '../service/store/actions/actions';
import { Markers } from './marker';

type A_Marker = string | null;

export type DataSlice = {
  markers: Markers;
};

export type LogicSlice = {
  activeMarker: A_Marker;
};

export type RootState = {
  data: DataSlice;
  logic: LogicSlice;
};

export type Scope = {
  markers: Markers;
  activeMarker: A_Marker;
  storage: MarkersStorage;
  dispatch: Dispatch<Actions>;
};
