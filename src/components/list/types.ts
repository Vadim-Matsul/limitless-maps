import { MarkersStorage } from '../../helpers/sessionStorage';
import { Label, Location, Markers } from '../../types/marker';
import { A_Marker } from '../../types/state-manager';

export type GeneralListProps = {
  onItemClick: () => void;
  onCheckClick?: (value: Location) => void;
  activeMarker: A_Marker;
  isMark?: boolean;
};

export type ListProps = GeneralListProps & {
  i_data: Markers | Label[];
  emptyText: string;
  storage?: MarkersStorage;
};
