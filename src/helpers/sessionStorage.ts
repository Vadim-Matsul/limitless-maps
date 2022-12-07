import type {
  EditMarkerData,
  InitMarkerData,
  EditLabelData,
  MarkerCortege,
  Markers,
  Marker,
  Label
} from '../types/marker';
import type { A_Marker } from '../types/state-manager';
import type { EditData } from '../types/types';

import { narrowStringType } from './utils';


export class MarkersStorage {

  static #key = narrowStringType('MARKERS');
  #markers: Markers;

  constructor() {
    this.#markers = MarkersStorage.#getMarkers();
  };

  getMarkers(): Markers {
    return JSON.parse(JSON.stringify(this.#markers));
  };

  createMarker(data: InitMarkerData): Marker {
    const id = crypto.randomUUID();
    const marker: Marker = { ...data, labels: [], id };
    this.#markers.push(marker);
    MarkersStorage.#setStorageMarkers(this.#markers);
    return marker;
  };

  createLabel(markerId: A_Marker, title: string): MarkerCortege | undefined {
    const [marker, index_m] = this.#find<Marker>(this.#markers, markerId);
    if (marker && index_m! !== undefined) {
      const labelId = crypto.randomUUID();
      marker.labels.push({ id: labelId, title });
      this.#markers.splice(index_m, 1, marker);
      MarkersStorage.#setStorageMarkers(this.#markers);
      return [marker, index_m];
    }
  }

  editLabelTitle({ value, id, activeMarker }: EditData): EditLabelData | undefined {
    const [marker, index_m] = this.#find<Marker>(this.#markers, activeMarker);
    if (marker && index_m !== undefined) {
      const [label, index_l] = this.#find<Label>(marker.labels, id);
      if (label && index_l !== undefined) {
        label.title = value;
        marker.labels.splice(index_l, 1, label);
        this.#markers.splice(index_m, 1, marker);
        MarkersStorage.#setStorageMarkers(this.#markers);
        return { label, m_inx: index_m, l_inx: index_l };
      }
    }
  }

  editMarkerTitle({ value, id }: Omit<EditData, 'activeMarker'>): EditMarkerData | undefined {
    const [marker, index_m] = this.#find<Marker>(this.#markers, id);
    if (marker && index_m !== undefined) {
      marker.title = value;
      this.#markers.splice(index_m, 1, marker);
      MarkersStorage.#setStorageMarkers(this.#markers);
      return { marker, m_inx: index_m };
    }
  }

  deleteMarker(id: string): void {
    const filtered = this.#markers.filter(m => m.id !== id);
    this.#markers = filtered;
    MarkersStorage.#setStorageMarkers(filtered);
  };

  deleteLabel(id: string, marker_id: string): MarkerCortege | undefined {
    const [marker, index] = this.#find(this.#markers, marker_id);
    if (marker && index !== undefined) {
      const labels = marker['labels'].filter(label => label.id !== id);
      marker['labels'] = labels;
      this.#markers.splice(index, 1, marker);
      MarkersStorage.#setStorageMarkers(this.#markers);
      return [marker, index];
    }
  };

  #find<
    R extends Marker | Label
  >(scope: R[], id: string | A_Marker): [R | undefined, number | undefined] {
    let INDEX: number | undefined;
    const result = scope.find((item, index) => {
      if (item.id === id) {
        INDEX = index;
        return true;
      }
      return false;
    });
    return [result, INDEX];
  }

  static #getMarkers(): Markers {
    const data = this.#parse(sessionStorage.getItem(this.#key));
    if (data === null) {
      this.#setStorageMarkers([]);
      return [];
    }
    return data;
  };

  static #setStorageMarkers(value: Markers) {
    sessionStorage.setItem(this.#key, JSON.stringify(value));
  };

  static #parse(str: string | null): Markers | null {
    return str
      ? JSON.parse(str)
      : null;
  };
};
