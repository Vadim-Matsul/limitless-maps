export type Location = {
  lat: number;
  lng: number;
};

export type Label = {
  name: string;
};

export type Marker = {
  location: Location;
  labels: Label[];
  title: string;
  id: string;
};

export type Markers = Marker[];

export type InitMarkerData = Pick<Marker, 'location' | 'title'>;
