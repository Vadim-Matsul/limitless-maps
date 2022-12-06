import { Label, Marker } from '../../../types/marker';
import { DetailedProps } from '../../../types/types';
import { GeneralListProps } from '../types';

export type Props = GeneralListProps & {
  bundle: Marker | Label;
};

export type ItemProps = DetailedProps<Props, HTMLLIElement>;
