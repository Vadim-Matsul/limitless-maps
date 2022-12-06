import { ListProps } from './types';
import Item from './item/Item';


import style from './List.module.css';

const List: React.FC<ListProps> = (props) => {
  const { i_data } = props;


  return (
    <ul className={style.list}>
      {
        i_data.map(iteration => (
          <Item
            key={iteration.id}
            title={iteration.title}
          />
        ))
      }
    </ul>
  );
};

export default List;

