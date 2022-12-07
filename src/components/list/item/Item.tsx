/* eslint-disable react-hooks/exhaustive-deps */
import { ItemProps } from './types';

import style from './Item.module.css';
import { Marker } from '../../../types/marker';
import React, { ChangeEvent, FocusEvent, useCallback, useReducer, useRef, useState } from 'react';
import { delSpaces } from '../../../helpers/utils';

let ClassName: string;
let ClassNameInp: string;

const Item: React.FC<ItemProps> = (props) => {
  const { bundle, onItemClick, onCheckClick, onEdit, onDelete, isMark, activeMarker, map } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const editable = useRef<boolean>(false);
  const [titleState, setTitleState] = useState<string>(bundle.title);
  const [, forceUpdate] = useReducer(n => n + 1, 0);

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
    map?.setCenter(location);
    onCheckClick && onCheckClick(id);
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
    <li
      className={ClassName}
      onClick={onItemClick}
    >
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
          className={ClassNameInp}
          value={titleState}
          contentEditable={false}
          suppressContentEditableWarning
          type='text'
          maxLength={15}
          onChange={handleTitleChange}
          onBlur={evt => setTimeout(handleLoseFocus, 130, evt)}
          onFocus={handleFocus}
          ref={titleRef}
        />
      </div>
      <div>
        {isMark && activeMarker !== bundle.id &&
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