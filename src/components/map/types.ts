import type { DetailedProps, GMaps_Map, GMaps_MouseEvent } from '../../types/types';

export type MapProps = DetailedProps<{}, HTMLElement>;

export type MapT = GMaps_Map | null;
export type MapReady = null | boolean;
export type LoadCB = (map: GMaps_Map) => void;
export type MapClickCB = (evt: GMaps_MouseEvent) => void;

