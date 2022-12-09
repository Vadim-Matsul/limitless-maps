/* eslint-disable react-hooks/exhaustive-deps */
import type { ListProps } from './types';

import Empty from './empty';
import Item from './item';

import style from './List.module.css';


const List: React.FC<ListProps> = ({
  i_data, activeMarker, isMark = true, emptyText,
  onCheckClick, onDelete, onEdit,
}) => (

  <div
    className={!isMark ? style.list__wrap : ''}
    data-testid='list'
  >
    <ul className={style.list}>
      {
        i_data.length
          ?
          i_data.map(bundle =>
            <Item
              activeMarker={activeMarker}
              onCheckClick={onCheckClick}
              onDelete={onDelete}
              bundle={bundle}
              isMark={isMark}
              onEdit={onEdit}
              key={bundle.id}
            />
          )
          :
          <Empty
            emptyText={emptyText}
          />
      }
    </ul>
  </div>

);

export default List;
