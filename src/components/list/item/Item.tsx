/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useReducer,
  useState,
  useRef
} from 'react';

import type { ChangeEvent, FocusEvent } from 'react';
import type { Marker } from '../../../types/marker';
import type { ItemProps } from './types';

import { delSpaces } from '../../../helpers/utils';

import style from './Item.module.css';


let ClassName: string;
let ClassNameInp: string;


const Item: React.FC<ItemProps> = (props) => {
  const { bundle, onCheckClick, onEdit, onDelete, isMark, activeMarker } = props;
  const [titleState, setTitleState] = useState<string>(bundle.title);
  const [, forceUpdate] = useReducer(n => n + 1, 0);
  const titleRef = useRef<HTMLInputElement>(null);
  const editable = useRef<boolean>(false);

  ClassName = `
    ${style.item}
    ${isMark && activeMarker === bundle.id ? style.item_check : ''}
  `;

  ClassNameInp = `
   ${style.title}
   ${editable.current ? style.title_active : ''}
  `;


  const handleCheckClick = () => {
    const { location, id } = bundle as Marker;
    onCheckClick && onCheckClick({ id, location });
  };


  const handleEditClick = useCallback(
    () => {
      if (editable.current) { return; };
      const input = titleRef.current!;
      editable.current = true;
      forceUpdate();
      input.focus();
      input.selectionEnd = titleState.length;
    }, [titleState]);


  const handleTitleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      editable.current && setTitleState(evt.target.value);
    }, [bundle.title]);


  const handleSaveTitle = useCallback(
    () => {
      editable.current = false;
      const update = delSpaces(titleState);
      update !== bundle.title && update.length
        ? onEdit({ value: update, id: bundle.id, activeMarker })
        : setTitleState(bundle.title);
      forceUpdate();
    }, [titleState, onEdit]);


  const handleLoseFocus = useCallback(
    (evt: FocusEvent<HTMLInputElement>) => {
      if (editable.current) {
        evt.target.value = bundle.title;
        editable.current = false;
        setTitleState(bundle.title);
        forceUpdate();
      }
    }, [bundle.title]);


  const handleFocus = useCallback((evt: FocusEvent<HTMLInputElement>) => {
    if (!editable.current) evt.target.blur();
  }, [bundle.title]);


  const handleDeleteCLick = () => {
    onDelete(bundle.id, activeMarker);
  };


  return (
    <li className={ClassName}>
      <div className={style.title_wrap} >
        {
          editable.current &&
          <span
            className={'material-icons'}
            onClick={handleSaveTitle}
          >
            check_circle
          </span>
        }
        <input
          onBlur={evt => setTimeout(handleLoseFocus, 130, evt)}
          onChange={handleTitleChange}
          className={ClassNameInp}
          onFocus={handleFocus}
          value={titleState}
          maxLength={15}
          ref={titleRef}
          type='text'
        />
      </div>
      <div>
        {
          isMark && activeMarker !== bundle.id &&
          <span
            className={'material-icons'}
            onClick={handleCheckClick}
          >
            check_circle
          </span>
        }
        <span
          className='material-icons'
          onClick={handleEditClick}
        >
          edit
        </span>
        <span
          className='material-icons'
          onClick={handleDeleteCLick}
        >
          delete
        </span>
      </div>
    </li>
  );
};

export default Item;
