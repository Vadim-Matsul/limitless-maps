/* eslint-disable react-hooks/exhaustive-deps */
import { ListProps } from './types';
import Item from './item/Item';


import style from './List.module.css';
import Empty from './empty/Empty';
import { useCallback } from 'react';
import { createModal } from '../map/createModal';

const List: React.FC<ListProps> = (props) => {
  const { storage, i_data, onItemClick, activeMarker, isMark = true, emptyText, onCheckClick } = props;


  return (
    <div className={!isMark ? style.list__wrap : ''}>
      <ul className={style.list}>
        {
          i_data.length
            ?
            i_data.map(bundle => (
              <Item
                key={bundle.id}
                bundle={bundle}
                onItemClick={onItemClick}
                isMark={isMark}
                activeMarker={activeMarker}
                onCheckClick={onCheckClick}
              />
            ))
            :
            <Empty
              isMark={isMark}
              emptyText={emptyText}
            />
        }
      </ul>
    </div>
  );
};

export default List;

