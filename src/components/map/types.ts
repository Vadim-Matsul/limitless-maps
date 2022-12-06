import { DetailedProps, GMaps_Map } from '../../types/types';

export type MapProps = DetailedProps<{}, HTMLElement>;

type MapRef = GMaps_Map | null;
type LoadCB = (map: GMaps_Map) => void;
type MapReady = null | boolean;

export type { MapRef, LoadCB, MapReady };
