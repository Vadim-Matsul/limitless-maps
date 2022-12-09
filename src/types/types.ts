import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { LoadCB, MapClickCB } from '../components/map/types';
import type { A_Marker, Ready } from './state-manager';
import type { Location } from './marker';


export type DetailedProps<
  Props = Record<string, any>,
  Element = HTMLDivElement,
> = Props & DetailedHTMLProps<
  HTMLAttributes<Element>,
  Element
>;

type Identity<T> = { [P in keyof T]: T[P] }
export type Replace<T, K extends keyof T, TReplace> = Identity<Pick<T, Exclude<keyof T, K>> & {
  [P in K]: TReplace
}>;

export type EditData = { value: string, id: string, activeMarker: A_Marker };
export type CheckData = { id: string, location: Location };

export type DeleteHandler = (id: string, activeMarker?: A_Marker) => void;
export type CheckHandler = (bundle: CheckData) => void;
export type EditHandler = (bundle: EditData) => void;

export type GMaps_MapsEventListener = google.maps.MapsEventListener;
export type GMaps_MouseEvent = google.maps.MapMouseEvent;
export type GMaps_LatLng = google.maps.LatLng;
export type GMaps_Marker = google.maps.Marker;
export type GMaps_Map = google.maps.Map;

export type MapDataHook = {
  handleMapClick: MapClickCB;
  handleUnmount: () => void;
  handleLoad: LoadCB;
  shieldText: string;
  isReady: Ready;
};
