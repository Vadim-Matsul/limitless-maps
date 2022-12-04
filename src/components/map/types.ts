import { DetailedProps } from '../../types/types';

export type MapProps = DetailedProps<{}, HTMLElement>;

type GoogleMap = google.maps.Map;
type MapRef = GoogleMap | null;
type LoadCB = (map: GoogleMap) => void;
type MapReady = null | boolean;

export type { MapRef, LoadCB, MapReady };
