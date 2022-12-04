import React from 'react';
import { DetailedProps } from '../../types/types';

type MapProps = DetailedProps<{}, HTMLDivElement>

const Labels: React.FC<MapProps> = () => {

  return (
    <div>
      Labels
    </div>
  );
};

export default Labels;
