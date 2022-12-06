export type Location = {
  lat: number;
  lng: number;
};

export type Label = {
  title: string;
  id: string;
};

export type Marker = {
  location: Location;
  labels: Label[];
} & Label;

export type Markers = Marker[];

export type InitMarkerData = Pick<Marker, 'location' | 'title'>;
