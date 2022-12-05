import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type DetailedProps<
  Props = Record<string, any>,
  Element = HTMLDivElement,
> = Props & DetailedHTMLProps<
  HTMLAttributes<Element>,
  Element
>;

export type GMaps_MouseEvent = google.maps.MapMouseEvent;
export type GMaps_LatLng = google.maps.LatLng;
export type GMaps_Marker = google.maps.Marker;
