import type {
  EditMarkerData,
  InitMarkerData,
  EditLabelData,
  MarkerCortege,
  Marker,
  Label,
  Location,
} from '../../types/marker';
import { Replace } from '../../types/types';



interface ILabelC extends Label {
  editTitle(title: string): void;
  read(): Label;
};

class LabelC implements ILabelC {
  public readonly id: string;
  public title: string;

  constructor(bundle: string | ILabelC) {
    if (typeof bundle === 'string') {
      this.id = crypto.randomUUID();
      this.title = bundle;
    } else {
      this.id = bundle.id;
      this.title = bundle.title;
    }
  };

  public read(): Label {
    return { id: this.id, title: this.title, };
  };

  public editTitle(title: string): void {
    this.title = title;
  };

};


type TMarker = Replace<Marker, 'labels', LabelC[]>

interface IMarkerC extends TMarker {
  editLabelTitle(id: string, title: string): void;
  editTitle(title: string): void;
  addLabel(title: string): void;
  deleteLabel(id: string): void;
  read(): Marker;
};

class MarkerC implements IMarkerC {
  public readonly location: Location;
  public readonly id: string;
  public labels: LabelC[];
  public title: string;


  constructor(data: InitMarkerData | TMarker) {
    if (Object.hasOwn(data, 'id')) {
      const { id, labels, location, title } = data as TMarker;
      this.labels = this.initializeLabels(labels);
      this.location = location;
      this.title = title;
      this.id = id;
    } else {
      const { location, title } = data;
      this.id = crypto.randomUUID();
      this.location = location;
      this.title = title;
      this.labels = [];
    }
  };

  public editTitle(title: string) {
    this.title = title;
  };

  public read(): Marker {
    return {
      id: this.id,
      labels: this.labels,
      title: this.title,
      location: this.location
    };
  };

  public addLabel(title: string): void {
    const label = new LabelC(title);
    this.labels.push(label);
  };

  public deleteLabel(id: string): void {
    const labels = this.labels.filter(
      (label) => label.id !== id
    );
    this.labels = labels;
  };

  public editLabelTitle(id: string, title: string): [number, Label] | undefined {
    let INDEX: number;
    const editLabel = this.labels.find(
      (label, i) => {
        if (label.id === id) {
          INDEX = i;
          return true;
        }
        return false;
      }
    );

    if (editLabel && INDEX! !== undefined) {
      editLabel.editTitle(title);
      return [INDEX, editLabel.read()];
    }
  };

  private initializeLabels(labels: ILabelC[]): ILabelC[] {
    if (!labels.length) return [];

    const update_labels = [];
    for (let label of labels) {
      const update_label = new LabelC(label);
      update_labels.push(update_label);
    }
    return update_labels;
  };

};



class Storage {
  private readonly sessionKey = 'MARKERS';
  private markers: MarkerC[];

  constructor() {
    this.markers = this.initialize();
  };

  protected addMarker_s(data: InitMarkerData): MarkerC {
    const marker = new MarkerC(data);

    this.markers.push(marker);

    this.saveMarkers();
    return marker;
  };

  protected addLabel_s(marker_id: string, title: string): MarkerCortege | undefined {
    const [marker, m_ind, okay] = this.find(marker_id);
    if (okay) {
      marker!.addLabel(title);
      this.saveMarkers();
      return [marker!, m_ind!];
    }
  };

  protected getAllMarkers() {
    return [...this.markers];
  };

  protected updateMarkerTitle_s(title: string, id: string): EditMarkerData | undefined {
    const [marker, m_index, okay] = this.find(id);
    if (okay) {
      marker!.editTitle(title);
      this.saveMarkers();
      return { marker: marker!, m_inx: m_index! };
    }
  };

  protected updateLableTitle_s(title: string, marker_id: string, label_id: string): EditLabelData | undefined {
    const [marker, m_index, okay] = this.find(marker_id);
    if (okay) {
      const [l_inx, label] = marker!.editLabelTitle(label_id, title)!;
      this.saveMarkers();
      return { label, l_inx, m_inx: m_index! };
    }
  };

  protected removeMarker_s(marker_id: string) {
    const markers = this.markers.filter(
      marker => marker.id !== marker_id
    );
    this.markers = markers;
    this.saveMarkers();
  };

  protected removeLabel_s(marker_id: string, label_id: string): MarkerCortege | undefined {
    const [marker, m_ind, okay] = this.find(marker_id);
    if (okay) {
      marker!.deleteLabel(label_id);
      this.saveMarkers();
      return [marker!, m_ind!];
    }
  };

  private find(marker_id: string): [MarkerC | null, number | null, boolean] {
    let INDEX: number;
    let okay = false;

    const marker = this.markers.find(
      (marker, i) => {
        if (marker.id === marker_id) {
          INDEX = i;
          return true;
        }
        return false;
      }
    );

    if (marker && INDEX! !== undefined) {
      okay = true;
      return [marker, INDEX!, okay];
    }
    return [null, null, okay];
  };


  private initialize(): MarkerC[] {
    const response = sessionStorage.getItem(this.sessionKey);

    if (response == null) {
      this.saveMarkers([]);
      return [];
    }

    const markers_without_prototype: TMarker[] = JSON.parse(response);
    if (!markers_without_prototype.length) return [];

    const update_markers = [];
    for (let marker of markers_without_prototype) {
      const update_marker = new MarkerC(marker);
      update_markers.push(update_marker);
    }
    return update_markers;
  };

  private saveMarkers(value?: []): void {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(value || this.markers));
  };

};



interface IMarkerData {
  updateLabelTitle(title: string, marker_id: string, label_id: string): EditLabelData | undefined;
  removeLabel(marker_id: string, label_id: string): MarkerCortege | undefined;
  createLabel(marker_id: string, title: string): MarkerCortege | undefined;
  updateMarkerTitle(title: string, id: string): void;
  createMarker(data: InitMarkerData): MarkerC;
  removeMarker(marker_id: string): void;
  getAll(): MarkerC[];
};

export default class MarkerData extends Storage implements IMarkerData {

  public createMarker(data: InitMarkerData) {
    return this.addMarker_s(data);
  };

  public removeMarker(marker_id: string) {
    return this.removeMarker_s(marker_id);
  };

  public updateMarkerTitle(title: string, id: string) {
    return this.updateMarkerTitle_s(title, id);
  };

  public createLabel(marker_id: string, title: string) {
    return this.addLabel_s(marker_id, title);
  };

  public removeLabel(marker_id: string, label_id: string) {
    return this.removeLabel_s(marker_id, label_id);
  };

  public updateLabelTitle(title: string, marker_id: string, label_id: string) {
    return this.updateLableTitle_s(title, marker_id, label_id);
  };

  public getAll() {
    return this.getAllMarkers();
  };

};
