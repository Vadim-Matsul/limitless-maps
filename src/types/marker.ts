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

export type MarkerCortege = [Marker, number];

export type MarkerCenterData = {
  id: string;
  location: Location;
};

export type EditLabelData = {
  label: Label,
  m_inx: number,
  l_inx: number,
};

export type EditMarkerData = {
  marker: Marker,
  m_inx: number,
};
