import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { A_Marker } from './state-manager';

export type DetailedProps<
  Props = Record<string, any>,
  Element = HTMLDivElement,
> = Props & DetailedHTMLProps<
  HTMLAttributes<Element>,
  Element
>;

export type EditData = { value: string, id: string, activeMarker: A_Marker };
export type EditHandler = (bundle: EditData) => void;
export type DeleteHandler = (id: string, activeMarker?: A_Marker) => void;


export type GMaps_MouseEvent = google.maps.MapMouseEvent;
export type GMaps_LatLng = google.maps.LatLng;
export type GMaps_Marker = google.maps.Marker;
export type GMaps_Map = google.maps.Map;
export type GMaps_MapsEventListener = google.maps.MapsEventListener;
