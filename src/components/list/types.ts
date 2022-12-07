import { MarkersStorage } from '../../helpers/sessionStorage';
import { Label, Markers } from '../../types/marker';
import { A_Marker } from '../../types/state-manager';
import { DeleteHandler, EditHandler } from '../../types/types';
import { MapT } from '../map/types';


export type GeneralListProps = {
  onItemClick: () => void;
  onCheckClick?: (value: string) => void;
  onEdit: EditHandler;
  onDelete: DeleteHandler;
  activeMarker: A_Marker;
  isMark?: boolean;
  map: MapT
};

export type ListProps = GeneralListProps & {
  i_data: Markers | Label[];
  emptyText: string;
  storage?: MarkersStorage;
};
