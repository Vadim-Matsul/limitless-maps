import type {
  EditMarkerData,
  InitMarkerData,
  EditLabelData,
  MarkerCortege,
  Markers,
  Marker,
  Label
} from '../../types/marker';
import type { A_Marker } from '../../types/state-manager';
import type { EditData } from '../../types/types';



class MarkerStorage {
  private key = 'MARKERS';
  private markers: Markers;

  constructor() {
    this.markers = this.initialize();
  }

  public getMarkers(): Markers {
    return [...this.markers];
  };

  private initialize(): Markers {
    const response = sessionStorage.getItem(this.key);
    return response !== null
      ? JSON.parse(response)
      : [];
  };

  protected save(value: Markers) {
    this.markers = value;
    sessionStorage.setItem(this.key, JSON.stringify(value));
  };

};



export default class MarkerData extends MarkerStorage {

  public createMarker(data: InitMarkerData): Marker {
    const id = crypto.randomUUID();
    const marker: Marker = { ...data, labels: [], id };

    const markers = this.getMarkers();
    markers.push(marker);
    this.save(markers);

    return marker;
  };

  public editMarkerTitle({ value, id }: Omit<EditData, 'activeMarker'>): EditMarkerData | undefined {
    const markers = this.getMarkers();
    const [marker, index_m] = this.find<Marker>(markers, id);

    if (marker && index_m !== undefined) {
      marker.title = value;

      markers.splice(index_m, 1, marker);
      this.save(markers);

      return { marker, m_inx: index_m };
    }
  };

  public deleteMarker(id: string): void {
    const markers = this.getMarkers();
    const filtered = markers.filter(m => m.id !== id);
    this.save(filtered);
  };



  public createLabel(markerId: A_Marker, title: string): MarkerCortege | undefined {
    const markers = this.getMarkers();

    const [marker, index_m] = this.find<Marker>(markers, markerId);

    if (marker && index_m! !== undefined) {
      const labelId = crypto.randomUUID();
      marker.labels.push({ id: labelId, title });

      markers.splice(index_m, 1, marker);
      this.save(markers);

      return [marker, index_m];
    }
  };

  public editLabelTitle({ value, id, activeMarker }: EditData): EditLabelData | undefined {
    const markers = this.getMarkers();

    const [marker, index_m] = this.find<Marker>(markers, activeMarker);

    if (marker && index_m !== undefined) {
      const [label, index_l] = this.find<Label>(marker.labels, id);

      if (label && index_l !== undefined) {
        label.title = value;
        marker.labels.splice(index_l, 1, label);

        markers.splice(index_m, 1, marker);
        this.save(markers);

        return { label, m_inx: index_m, l_inx: index_l };
      }
    }
  };

  public deleteLabel(id: string, marker_id: string): MarkerCortege | undefined {
    const markers = this.getMarkers();
    const [marker, index] = this.find(markers, marker_id);

    if (marker && index !== undefined) {
      const labels = marker['labels'].filter(label => label.id !== id);
      marker['labels'] = labels;

      markers.splice(index, 1, marker);
      this.save(markers);

      return [marker, index];
    }
  };



  private find<R extends Marker | Label>
    (scope: R[], id: string | A_Marker): [R | undefined, number | undefined] {

    let INDEX: number | undefined;
    const result = scope.find((item, index) => {
      if (item.id === id) {
        INDEX = index;
        return true;
      }
      return false;
    });
    return [result, INDEX];

  };

};
