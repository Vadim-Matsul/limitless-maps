/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import { MapContext } from '../../service/context/ContextProvider';
import { MarksProps } from './types';

import style from './Marks.module.css';
import List from '../list/List';
import { config } from '../../helpers/const';
import { ACTIONS_CREATORS } from '../../service/store/actions/actions';
import { EditHandler } from '../../types/types';

const Marks: React.FC<MarksProps> = ({ className }) => {
  const { markers, activeMarker, dispatch, storage, map } = useContext(MapContext);
  const ClassName = `${className} ${style.marks}`;

  const handleItemClick = useCallback(() => {

  }, []);

  const handleCheckClick = useCallback((value: string) => {
    dispatch(ACTIONS_CREATORS.setActiveMarker(value));
  }, []);

  const handleEditMarker: EditHandler = useCallback(({ value, id }) => {
    const response = storage.editMarkerTitle({ value, id });
    response && dispatch(ACTIONS_CREATORS.editMarkerTitle(response));
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
          onEdit={handleEditMarker}
          map={map}
        />
      </div>
    </div>
  );
};

export default Marks;
