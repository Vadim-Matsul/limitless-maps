/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useLayoutEffect,
  useCallback,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useRef
} from 'react';

import type { GMaps_LatLng, GMaps_MapsEventListener, GMaps_Marker, MapDataHook } from '../../types/types';
import type { LoadCB, MapClickCB, MapT } from './types';

import { checkMapButtonError, delSpaces } from '../../helpers/utils';
import config from '../../helpers/const';

import { MapContext } from '../../service/context/ContextProvider';
import { ACTIONS_CREATORS } from '../../service/store/actions/actions';
import { createModal } from './createModal';


let shieldText = config.mapInitProcess;

const useMapLogic = (): MapDataHook => {

  const listenerMapRef = useRef<GMaps_MapsEventListener[]>([]);
  const [up, forceUpdate] = useReducer(n => n + 1, 0);
  const prevMarkersRef = useRef<GMaps_Marker[]>([]);
  const mapRef = useRef<MapT>(null);


  const { markers, center, isReady, dispatch, storage } = useContext(MapContext);


  useLayoutEffect(() => {
    mapRef.current && mapRef.current.setCenter(center);
  }, [center]);


  useEffect(() => {
    if (prevMarkersRef.current.length) {
      const titles = prevMarkersRef.current.map(m => m.get('title'));
      for (let marker of markers) {
        !titles.includes(marker.title) && forceUpdate();
      }
    }
  });


  const MARKERS = useMemo(() => {
    if (mapRef.current && isReady) {

      prevMarkersRef.current.length && prevMarkersRef.current.forEach(marker => {
        marker.setMap(null);
      });

      const MARKERS_arr: GMaps_Marker[] = [];
      let myLatlng: GMaps_LatLng;
      let point: GMaps_Marker;

      markers.forEach(marker => {
        myLatlng = new google.maps.LatLng(marker.location.lat, marker.location.lng);
        point = new google.maps.Marker({
          position: myLatlng,
          icon: { url: config.staticIconPath },
          title: marker.title,
          draggable: true,
        });
        point.set('id', marker.id);
        point.set('title', marker.title);

        MARKERS_arr.push(point);
      });

      setTimeout(() => { prevMarkersRef.current = MARKERS_arr; });
      return MARKERS_arr;
    }
  }, [mapRef.current, isReady, markers, up]);


  const clearListeners = useCallback(() => {
    listenerMapRef.current.forEach(listener => {
      google.maps.event.removeListener(listener);
    });
    listenerMapRef.current = [];
  }, []);


  useEffect(() => {
    if (mapRef.current && isReady && MARKERS?.length) {
      const isNew = listenerMapRef.current.length !== MARKERS!.length;
      let listener: GMaps_MapsEventListener;

      isNew && clearListeners();

      MARKERS!.forEach(marker => {
        if (isNew) {
          listener = marker.addListener('click', () => {
            dispatch(ACTIONS_CREATORS.setActiveMarker(marker.get('id')));
          });
          listenerMapRef.current.push(listener);
        }
        marker.setMap(mapRef.current);
      });
    }

    return () => {
      listenerMapRef.current.length && clearListeners();
    };
  }, [isReady, MARKERS]);


  const handleLoad = useCallback<LoadCB>(async map => {
    map && await checkMapButtonError(config.dismissClassButton, 200)
      .then(
        res => {
          mapRef.current = map;
          dispatch(ACTIONS_CREATORS.changeReady(res));
        },
        rej => {
          shieldText = config.sww;
          dispatch(ACTIONS_CREATORS.changeReady(rej));
        });
  }, []);


  const handleUnmount = useCallback(() => mapRef.current = null, []);


  const handleMapClick = useCallback<MapClickCB>(async (evt) => {
    const lat = evt.latLng?.lat();
    const lng = evt.latLng?.lng();
    const isUndefined = lat === undefined || lng === undefined;

    !isUndefined &&
      await createModal()
        .then(
          (init) => {
            let title = delSpaces(init!);
            if (!title.length) title = config.vanillaMarkerTitle;

            const marker = storage.createMarker({ location: { lat, lng }, title });
            dispatch(ACTIONS_CREATORS.createMarker(marker));
            return;
          });
  }, []);


  return {
    handleMapClick,
    handleUnmount,
    handleLoad,
    shieldText,
    isReady,
  };

};


export default useMapLogic;
