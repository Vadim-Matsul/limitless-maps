import { ItemProps } from './types';

import style from './Item.module.css';

const Item: React.FC<ItemProps> = (props) => {
  const { title } = props;

  return (
    <li className={style.item} >
      <h3>{title}</h3>
      <div>
        <span className={'material-icons'}>
          check_circle
        </span>
        <span className='material-icons'>
          edit
        </span>
        <span className='material-icons'>
          delete
        </span>
      </div>
    </li>
  );
};

export default Item;