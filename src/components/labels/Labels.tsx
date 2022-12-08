/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';

import { ACTIONS_CREATORS } from '../../service/store/actions/actions';
import { MapContext } from '../../service/context/ContextProvider';
import { createModal } from '../map/createModal';
import { delSpaces } from '../../helpers/utils/utils';
import config from '../../helpers/const';

import type { DeleteHandler, EditHandler } from '../../types/types';
import type { LabelsProps } from './types';

import Loader from '../loader';
import Error from '../error';
import List from '../list';

import style from './Labels.module.css';


const Labels: React.FC<LabelsProps> = (props) => {
  const { markers, activeMarker, dispatch, storage, isReady } = useContext(MapContext);
  const marker = markers.find(marker => marker.id === activeMarker);
  const { className } = props;

  const addLabelClass = `
    material-icons
    ${style.add_label}
  `;

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

  const handleEditLabel: EditHandler = useCallback((bundle) => {
    const response = storage.editLabelTitle(bundle);
    response && dispatch(ACTIONS_CREATORS.editLabelTitle(response));
  }, []);

  const handleDeleteLabel: DeleteHandler = useCallback((id, active) => {
    const bundle = storage.deleteLabel(id, active!);
    bundle && dispatch(ACTIONS_CREATORS.deleteLabel(bundle));
  }, []);


  return (
    <div className={className} >
      {
        isReady === null
          ? <Loader isWhite={false} />
          : isReady === true
            ? <div>
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
                      emptyText={config.list.label.empty}
                      onDelete={handleDeleteLabel}
                      activeMarker={activeMarker}
                      i_data={marker['labels']}
                      onEdit={handleEditLabel}
                      storage={storage}
                      isMark={false}
                    />
                  </>
                  :
                  <span className={style.no_select} >
                    {config.list.label.nothing}
                  </span>
              }
            </div>
            : <Error />
      }
    </div>
  );
};

export default Labels;
