/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useReducer } from 'react';
import type { PropsWithChildren } from 'react';
import { mainReducer } from '../store/reducers/main-reducer';
import { MarkersStorage } from '../../helpers/sessionStorage';
import { Scope } from '../../types/state-manager';
import { Markers } from '../../types/marker';
import { ACTIONS_CREATORS } from '../store/actions/actions';


export const storage = new MarkersStorage();
const markers: Markers = [];
const activeMarker = null;

const initialState = { logic: { activeMarker, }, data: { markers, }, };

export const MapContext = createContext<Scope>({
  storage,
  markers,
  activeMarker,
  dispatch: () => null,
});


const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const memo_markers = useMemo(() => state.data.markers, [state.data.markers]);
  const memo_activeMarker = useMemo(() => state.logic.activeMarker, [state.logic.activeMarker]);

  useEffect(() => {
    const init_markers = storage.getMarkers();
    dispatch(ACTIONS_CREATORS.initializationMarkers(init_markers));
  }, []);

  return (
    <MapContext.Provider
      value={{
        activeMarker: memo_activeMarker,
        markers: memo_markers,
        dispatch,
        storage,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default ContextProvider;
