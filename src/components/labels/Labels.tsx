/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';
import { config } from '../../helpers/const';
import { MapContext } from '../../service/context/ContextProvider';
import List from '../list/List';
import { LabelsProps } from './types';

import style from './Labels.module.css';
import { createModal } from '../map/createModal';
import { ACTIONS_CREATORS } from '../../service/store/actions/actions';
import { delSpaces } from '../../helpers/utils';
import { EditHandler } from '../../types/types';

const Labels: React.FC<LabelsProps> = (props) => {
  const { className } = props;
  const { markers, activeMarker, dispatch, storage, map } = useContext(MapContext);
  const marker = markers.find(marker => marker.id === activeMarker);

  const handleItemClick = useCallback(() => {

  }, []);

  const handleAddLabel = useCallback(async () => {
    if (activeMarker && storage) {
      await createModal()
        .then(
          (init) => {
            let title = delSpaces(init!);
            if (!title.length) title = config.vanillaLabelTitle;
            const marker = storage.createLabel(activeMarker, title);
            marker && dispatch(ACTIONS_CREATORS.addLabel(marker));
          },
          () => {
            // !........
          }
        );
    }
  }, [activeMarker]);

  const addLabelClass = `
    material-icons
    ${style.add_label}
  `;

  const handleEditLabel: EditHandler = useCallback((bundle) => {
    const response = storage.editLabelTitle(bundle);
    response && dispatch(ACTIONS_CREATORS.editLabelTitle(response));
  }, []);

  return (
    <div className={className} >
      <div>
        {
          marker
            ?
            <>
              <span
                className={addLabelClass}
                onClick={handleAddLabel}
              >
                control_point
              </span>
              <List
                i_data={marker['labels']}
                onItemClick={handleItemClick}
                isMark={false}
                activeMarker={activeMarker}
                emptyText={config.list.label.empty}
                storage={storage}
                onEdit={handleEditLabel}
                map={map}
              />
            </>
            :
            <span className={style.no_select} >
              {config.list.label.nothing}
            </span>
        }
      </div>
    </div>
  );
};

export default Labels;
