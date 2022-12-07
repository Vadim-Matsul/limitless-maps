import type { Label, Marker } from '../../../types/marker';
import type { DetailedProps } from '../../../types/types';
import type { GeneralListProps } from '../types';


type Props = GeneralListProps & {
  bundle: Marker | Label;
};

export type ItemProps = DetailedProps<Props, HTMLLIElement>;
