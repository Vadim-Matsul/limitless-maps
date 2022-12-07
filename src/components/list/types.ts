import { MarkersStorage } from '../../helpers/sessionStorage';

import type { CheckHandler, DeleteHandler, EditHandler } from '../../types/types';
import type { A_Marker } from '../../types/state-manager';
import type { Label, Markers } from '../../types/marker';


export type GeneralListProps = {
  onCheckClick?: CheckHandler;
  onDelete: DeleteHandler;
  onEdit: EditHandler;

  activeMarker: A_Marker;
  isMark?: boolean;
};

export type ListProps = GeneralListProps & {
  i_data: Markers | Label[];
  storage?: MarkersStorage;
  emptyText: string;
};
