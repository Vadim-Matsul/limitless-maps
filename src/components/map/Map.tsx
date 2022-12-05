/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { LoadCB, MapProps, MapReady, MapRef } from './types';
import { checkMapButtonError, delSpaces } from '../../helpers/utils';
import { config, mapInitialData, mapOptions } from '../../helpers/const';
import Shield from './shield/Shield';
import { MapContext } from '../../service/context/ContextProvider';
import { ACTIONS_CREATORS } from '../../service/store/actions/actions';
import { InitMarkerData } from '../../types/marker';
import { GMaps_LatLng, GMaps_Marker, GMaps_MouseEvent } from '../../types/types';
import { createModal } from './createModal';




let shieldText: string = config.mapInitProcess;


const Map: React.FC<MapProps> = (props) => {
  const { className } = props;

  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState<MapReady>(null);
  const [, setForce] = useState<number>(0);
  const { markers, dispatch, storage } = useContext(MapContext);


  const MARKERS = useMemo(() => {
    const MARKERS_arr: GMaps_Marker[] = [];
    let myLatlng: GMaps_LatLng;
    let point: GMaps_Marker;

    markers.forEach(marker => {
      myLatlng = new google.maps.LatLng(marker.location.lat, marker.location.lng);
      point = new google.maps.Marker({
        position: myLatlng,
        icon: { url: config.staticIconPath },
        title: marker.title,
      });
      MARKERS_arr.push(point);

      // google.maps.event.addListener(marker, 'click', () => {
      // })
      // marker.set('id', 102);
      // console.log(marker.get('id'));
      point.setMap(mapRef.current);
    });

    return MARKERS_arr;
  }, [markers]);

  useEffect(() => {
    if (mapRef.current) {
      const ins = mapRef.current;
      MARKERS.forEach(marker => marker.setMap(ins));
      setForce(prev => prev += 1);
    }
  }, [mapReady, MARKERS]);


  const handleLoad = useCallback<LoadCB>(async map => {
    await checkMapButtonError(config.dismissClassButton, 100)
      .then(
        res => {
          mapRef.current = map;
          setMapReady(res);
        },
        rej => {
          setMapReady(rej);
          shieldText = config.sww;
        });
  }, []);

  const handleUnmount = useCallback<LoadCB>(() => mapRef.current = null, []);


  const handleMapClick = useCallback(async (evt: GMaps_MouseEvent) => {
    const lat = evt.latLng?.lat();
    const lng = evt.latLng?.lng();
    const isUndefined = lat === undefined || lng === undefined;

    if (!isUndefined) {
      await createModal()
        .then(
          (init) => {
            const title = delSpaces(init!);
            const data: InitMarkerData = { location: { lat, lng }, title };
            const marker = storage.createMarker(data);
            return dispatch(ACTIONS_CREATORS.createMarker(marker));
          },
          () => {
            // !.... 
          }
        );
    }
    // !.... 
  }, []);


  return (
    <section className={className}>
      <>
        <Shield
          text={shieldText}
          mapReady={mapReady}
        />
        <GoogleMap
          mapContainerStyle={mapInitialData.style}
          center={mapInitialData.center}
          zoom={10}
          onLoad={handleLoad}
          onUnmount={handleUnmount}
          onClick={handleMapClick}
          options={mapOptions}
        >
        </GoogleMap>
      </>
    </section>
  );
};

export default Map;



