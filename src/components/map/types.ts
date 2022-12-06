import { DetailedProps, GMaps_Map } from '../../types/types';

export type MapProps = DetailedProps<{}, HTMLElement>;


type MapT = GMaps_Map | null;
type LoadCB = (map: GMaps_Map) => void;
type MapReady = null | boolean;

export type { MapT, LoadCB, MapReady };
