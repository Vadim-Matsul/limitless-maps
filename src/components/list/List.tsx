/* eslint-disable react-hooks/exhaustive-deps */
import { ListProps } from './types';
import Item from './item/Item';


import style from './List.module.css';
import Empty from './empty/Empty';

const List: React.FC<ListProps> = (props) => {
  const { storage, i_data, onItemClick, activeMarker, isMark = true, emptyText, onCheckClick, onEdit, map } = props;


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
                onEdit={onEdit}
                map={map}
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

