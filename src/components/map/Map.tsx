import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { LoadCB, MapProps, MapReady, MapRef } from './types';
import { checkMapButtonError } from '../../helpers/utils';
import { config } from '../../helpers/const';
import Shield from './shield/Shield';

const center = {
  lat: -3.745,
  lng: -38.523
};

let shieldText: string = config.mapInitProcess;


const Map: React.FC<MapProps> = (props) => {
  const { className } = props;
  const mapRef = useRef<MapRef>(null);
  const [mapReady, setMapReady] = useState<MapReady>(null);

  const handleLoad = useCallback<LoadCB>(async map => {
    await checkMapButtonError(config.dismissClassButton, 100)
      .then(
        res => setMapReady(res),
        rej => {
          setMapReady(rej);
          shieldText = config.sww;
        });

    mapRef.current = map;
  }, []);

  const handleUnmount = useCallback<LoadCB>(() => mapRef.current = null, []);


  return (
    <section className={className}>
      <>
        <Shield
          text={shieldText}
          mapReady={mapReady}
        />
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%'
          }}
          center={center}
          zoom={10}
          onLoad={handleLoad}
          onUnmount={handleUnmount}
        />
      </>
    </section>
  );
};

export default Map;
