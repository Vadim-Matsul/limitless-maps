import React, { useContext } from 'react';
import { MapContext } from '../../service/context/ContextProvider';
import { MarksProps } from './types';

import style from './Marks.module.css';
import List from '../list/List';

const Marks: React.FC<MarksProps> = ({ className }) => {
  const { markers, dispatch, storage } = useContext(MapContext);
  const ClassName = `${className} ${style.marks}`;


  return (
    <div className={ClassName}>
      <List
        i_data={markers}
      />
    </div>
  );
};

export default Marks;
