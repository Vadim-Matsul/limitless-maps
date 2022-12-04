type Location = {
  lat: number;
  lng: number;
};

type Label = {
  name: string;
};

export type Marker = {
  location: Location;
  labels: Label[];
  title: string;
  id?: number;
};

export type Markers = Marker[];
