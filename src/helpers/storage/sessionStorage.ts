import type {
  EditMarkerData,
  InitMarkerData,
  EditLabelData,
  MarkerCortege,
  Markers,
  Marker,
  Label,
  Location
} from '../../types/marker';
import type { A_Marker } from '../../types/state-manager';
import type { EditData } from '../../types/types';


// class MarkerStorage {
//   private key = 'MARKERS';
//   private markers: Markers;

//   constructor() {
//     this.markers = this.initialize();
//   }

//   public getMarkers(): Markers {
//     return [...this.markers];
//   };

//   private initialize(): Markers {
//     const response = sessionStorage.getItem(this.key);
//     return response !== null
//       ? JSON.parse(response)
//       : [];
//   };

//   protected save(value: Markers) {
//     this.markers = value;
//     sessionStorage.setItem(this.key, JSON.stringify(value));
//   };

// };



// export default class MarkerData extends MarkerStorage {

//   public createMarker(data: InitMarkerData): Marker {
//     const id = crypto.randomUUID();
//     const marker: Marker = { ...data, labels: [], id };

//     const markers = this.getMarkers();
//     markers.push(marker);
//     this.save(markers);

//     return marker;
//   };

//   public editMarkerTitle({ value, id }: Omit<EditData, 'activeMarker'>): EditMarkerData | undefined {
//     const markers = this.getMarkers();
//     const [marker, index_m] = this.find<Marker>(markers, id);

//     if (marker && index_m !== undefined) {
//       marker.title = value;

//       markers.splice(index_m, 1, marker);
//       this.save(markers);

//       return { marker, m_inx: index_m };
//     }
//   };

//   public deleteMarker(id: string): void {
//     const markers = this.getMarkers();
//     const filtered = markers.filter(m => m.id !== id);
//     this.save(filtered);
//   };



//   public createLabel(markerId: A_Marker, title: string): MarkerCortege | undefined {
//     const markers = this.getMarkers();

//     const [marker, index_m] = this.find<Marker>(markers, markerId);

//     if (marker && index_m! !== undefined) {
//       const labelId = crypto.randomUUID();
//       marker.labels.push({ id: labelId, title });

//       markers.splice(index_m, 1, marker);
//       this.save(markers);

//       return [marker, index_m];
//     }
//   };

//   public editLabelTitle({ value, id, activeMarker }: EditData): EditLabelData | undefined {
//     const markers = this.getMarkers();

//     const [marker, index_m] = this.find<Marker>(markers, activeMarker);

//     if (marker && index_m !== undefined) {
//       const [label, index_l] = this.find<Label>(marker.labels, id);

//       if (label && index_l !== undefined) {
//         label.title = value;
//         marker.labels.splice(index_l, 1, label);

//         markers.splice(index_m, 1, marker);
//         this.save(markers);

//         return { label, m_inx: index_m, l_inx: index_l };
//       }
//     }
//   };

//   public deleteLabel(id: string, marker_id: string): MarkerCortege | undefined {
//     const markers = this.getMarkers();
//     const [marker, index] = this.find(markers, marker_id);

//     if (marker && index !== undefined) {
//       const labels = marker['labels'].filter(label => label.id !== id);
//       marker['labels'] = labels;

//       markers.splice(index, 1, marker);
//       this.save(markers);

//       return [marker, index];
//     }
//   };



//   private find<R extends Marker | Label>
//     (scope: R[], id: string | A_Marker): [R | undefined, number | undefined] {

//     let INDEX: number | undefined;
//     const result = scope.find((item, index) => {
//       if (item.id === id) {
//         INDEX = index;
//         return true;
//       }
//       return false;
//     });
//     return [result, INDEX];

//   };

// };

interface ILabel {
  readLabel(): Label,
  editTitle(title: string): void,
}

class Label_c implements ILabel {
  private label: Label;

  constructor(title: string) {
    this.label = this.initializeLabel(title);
  }

  readLabel(): Label {
    return this.label;
  }

  editTitle(title: string): void {
    this.label.title = title;
  }

  private initializeLabel(title: string): Label {
    const id = crypto.randomUUID();
    return { title, id };
  }

}

interface IMarker {
  readMarker(): TMarker,
  editTitle(title: string): void,
  addLabel(title: string): void,
  editLabelTitle(title: string): void,
}

type TMarker = {
  id: string,
  title: string,
  labels: Label_c[],
  location: Location,
}

class Marker_c implements IMarker {
  private marker: TMarker;

  constructor(data: InitMarkerData) {
    this.marker = this.initializeMarker(data);
  };

  readMarker(): TMarker {
    return this.marker;
  }

  editTitle(title: string): void {
    this.marker.title = title;
  }

  addLabel(title: string): void {
    const label_instance = new Label_c(title);
    this.marker.labels.push(label_instance);
  }

  editLabelTitle(title: string,): void {
    this.marker.labels[0].editTitle(title);
  }

  private initializeMarker(data: InitMarkerData): TMarker {
    const id = crypto.randomUUID();
    return { ...data, labels: [], id };
  }

}

class Storage {
  private key = 'MARKERS';
  private markers: Marker_c[];

  constructor() {
    this.markers = this.initialize();
  }

  public createMarker(data: InitMarkerData): Marker_c {
    const marker_instance = new Marker_c(data);
    const markers = this.markers;
    markers.push(marker_instance);
    return marker_instance;
  }

  private initialize(): Marker_c[] {
    const response = sessionStorage.getItem(this.key);
    return response !== null ? JSON.parse(response) : [];
  }

  private save(value: Marker_c[]) {
    this.markers = value;
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

}

export { };
