import { ItemProps } from './types';

import style from './Item.module.css';
import { Marker } from '../../../types/marker';

let ClassName: string;

const Item: React.FC<ItemProps> = (props) => {
  const { bundle, onItemClick, onCheckClick, isMark, activeMarker } = props;

  ClassName = `
    ${style.item}
    ${isMark && activeMarker === bundle.id ? style.item_check : ''}
  `;

  const handleCheckClick = () => {
    const { location, id } = bundle as Marker;
    onCheckClick && onCheckClick({ id, location });
  };

  return (
    <li
      className={ClassName}
      onClick={onItemClick}
    >
      <h3>{bundle.title}</h3>
      <div>
        {isMark && activeMarker !== bundle.id &&
          <span
            className={'material-icons'}
            onClick={handleCheckClick}
          >
            check_circle
          </span>
        }
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