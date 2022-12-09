/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';

import type { CheckHandler, DeleteHandler, EditHandler } from '../../types/types';
import type { MarksProps } from './types';

import { ACTIONS_CREATORS } from '../../service/store/actions/actions';
import { MapContext } from '../../service/context/ContextProvider';
import config from '../../helpers/const';

import Loader from '../loader/Loader';
import Error from '../error';
import List from '../list/List';

import style from './Marks.module.css';


const Marks: React.FC<MarksProps> = ({ className }) => {
  const { markers, activeMarker, dispatch, storage, isReady } = useContext(MapContext);
  const ClassName = `${className} ${style.marks}`;


  const handleCheckClick: CheckHandler = useCallback(({ id, location }) => {
    dispatch(ACTIONS_CREATORS.setMapCenter(location));
    dispatch(ACTIONS_CREATORS.setActiveMarker(id));
  }, []);

  const handleEditMarker: EditHandler = useCallback(({ value, id }) => {
    const response = storage.updateMarkerTitle(value, id);
    response && dispatch(ACTIONS_CREATORS.editMarkerTitle(response));
  }, []);

  const handleDeleteMarker: DeleteHandler = useCallback((id) => {
    storage.removeMarker(id);
    dispatch(ACTIONS_CREATORS.deleteMarker(id));
  }, []);


  return (
    <div className={ClassName}>
      <div>
        {
          isReady === null
            ? <Loader isWhite={false} />
            : isReady === true
              ? <List
                emptyText={config.list.marks.empty}
                onCheckClick={handleCheckClick}
                onDelete={handleDeleteMarker}
                activeMarker={activeMarker}
                onEdit={handleEditMarker}
                i_data={markers}
              />
              : <Error />
        }
      </div>
    </div>
  );
};

export default Marks;
