import type { InitMarkerData, Label, Location, Marker, Markers } from '../types/marker';

const id = () => crypto.randomUUID();
const title = 'quality is important for devvela';

const createLocation = (): Location => ({
  lat: 55.75400661415227,
  lng: 37.61661170356091,
});

const createLabel = (): Label => ({ id: id(), title, });

const createMarker = (
  labelCount: number = 5
): Marker => ({
  location: createLocation(),
  labels: new Array(labelCount).fill(null).map(() => createLabel()),
  title,
  id: id(),
});

const createMarkers = (
  markerCount: number = 3
): Markers => new Array(markerCount).fill(null).map(() => createMarker());

const createInitMarkerData = (): InitMarkerData => ({ location: createLocation(), title });


export {
  createLabel,
  createMarker,
  createMarkers,
  createLocation,
  createInitMarkerData,
};
