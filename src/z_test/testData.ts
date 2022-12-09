import type { InitMarkerData, Label, Location, Marker } from '../types/marker';

const title = 'quality is important for devvela';
const markerId = 'marker';
const labelId = 'label';


const createLocation = (lat?: number, lng?: number): Location => ({
  lat: lat || 55.75400661415227,
  lng: lng || 37.61661170356091,
});

const createLabel = (data?: {
  title: string,
}): Label => ({ id: labelId, title: data?.title || title, });

const createMarker = (data?: {
  title: string,
}): Marker => ({
  location: createLocation(),
  labels: [createLabel()],
  id: markerId,
  title: data?.title || title,
});

const createInitMarkerData = (): InitMarkerData => ({ location: createLocation(), title });


export {
  title,
  labelId,
  markerId,
  createLabel,
  createMarker,
  createLocation,
  createInitMarkerData,
};
