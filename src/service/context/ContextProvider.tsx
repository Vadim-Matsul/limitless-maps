/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

import type { RootState, Scope } from '../../types/state-manager';
import type { Markers } from '../../types/marker';
import type { PropsWithChildren } from 'react';

import MarkerData from '../../helpers/storage/sessionStorage';
import { mainReducer } from '../store/reducers/main-reducer';
import { ACTIONS_CREATORS } from '../store/actions/actions';
import { mapInitialData } from '../../helpers/const';

import Loader from '../../components/loader';


const MAP_KEY = process.env.REACT_APP_MAP_KEY;

const center = mapInitialData.center;

const markers: Markers = [];
const activeMarker = null;
const isReady = null;

const initialState: RootState = { logic: { activeMarker, center, isReady }, data: { markers, }, };
const storage = new MarkerData();

export const MapContext = createContext<Scope>({
  center,
  storage,
  markers,
  isReady,
  activeMarker,
  dispatch: () => null,
});


const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAP_KEY!,
  });

  useEffect(() => {
    const init_markers = storage.getAll();
    dispatch(ACTIONS_CREATORS.initializationMarkers(init_markers));
  }, []);


  return (
    <MapContext.Provider
      value={{
        activeMarker: state.logic.activeMarker,
        isReady: state.logic.isReady,
        markers: state.data.markers,
        center: state.logic.center,
        dispatch,
        storage,
      }}
    >
      {
        isLoaded
          ? children
          : <Loader />
      }
    </MapContext.Provider>
  );
};

export default ContextProvider;
