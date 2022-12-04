import { Marker, Markers } from '../types/marker';
import { narrowStringType } from './utils';


export class MarkersStorage {

  static #key = narrowStringType('MARKERS');
  #markers: Markers;
  #lastMarkerId: number = 0;


  constructor() {
    this.#markers = MarkersStorage.#getMarkers();
  };


  getMarkers(): Markers {
    return this.#markers;
  };


  setMarker(marker: Marker): number {
    this.#lastMarkerId++;
    marker.id = this.#lastMarkerId;

    this.#markers.push(marker);
    MarkersStorage.#setStorageMarkers(this.#markers);

    return this.#lastMarkerId;
  };


  deleteMarker(marker: Marker): Markers {
    const filtered = this.#markers.filter(m => m.id !== marker.id);
    if (filtered.length !== this.#markers.length) {
      this.#markers = filtered;
      MarkersStorage.#setStorageMarkers(filtered);
    }
    return filtered;
  };


  static #getMarkers(): Markers {
    const data = this.#parse(sessionStorage.getItem(this.#key));
    if (data === null) {
      this.#setStorageMarkers([]);
      return [];
    }
    return data;
  };


  static #setStorageMarkers(v: Markers) {
    sessionStorage.setItem(this.#key, JSON.stringify(v));
  };


  static #parse(str: string | null): Markers | null {
    return str
      ? JSON.parse(str)
      : null;
  };

};
