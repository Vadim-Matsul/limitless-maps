/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import { MapContext } from '../../service/context/ContextProvider';
import { MarksProps } from './types';

import style from './Marks.module.css';
import List from '../list/List';
import { config } from '../../helpers/const';
import { Location, MarkerCenterData } from '../../types/marker';
import { ACTIONS_CREATORS } from '../../service/store/actions/actions';

const Marks: React.FC<MarksProps> = ({ className }) => {
  const { markers, activeMarker, dispatch, storage } = useContext(MapContext);
  const ClassName = `${className} ${style.marks}`;

  const handleItemClick = useCallback(() => {

  }, []);

  const handleCheckClick = useCallback((value: MarkerCenterData) => {
    dispatch(ACTIONS_CREATORS.setMapCenter(value));
  }, []);

  return (
    <div className={ClassName}>
      <div>
        <List
          i_data={markers}
          onItemClick={handleItemClick}
          onCheckClick={handleCheckClick}
          activeMarker={activeMarker}
          emptyText={config.list.marks.empty}
        />
      </div>
    </div>
  );
};

export default Marks;
