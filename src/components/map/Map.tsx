import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LoadCB, MapProps, MapReady, MapRef } from './types';
import { checkMapButtonError } from '../../helpers/utils';
import { config, mapInitialData, mapOptions } from '../../helpers/const';
import Shield from './shield/Shield';




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



  React.useEffect(() => {
    if (mapRef.current) {

      // var infowindow = new google.maps.InfoWindow({
      //   content: 'content String'
      // });


      var myLatlng = new google.maps.LatLng(mapInitialData.center.lat, mapInitialData.center.lng);

      var marker = new google.maps.Marker({
        position: myLatlng,
        icon: { url: config.staticIconPath },
        title: 'Название',
      });

      // google.maps.event.addListener(marker, 'click', () => {
      //   console.log('google.maps.event.addListe');
      // })
      // marker.set('id', 102);
      // console.log(marker.get('id'));

      marker.setMap(mapRef.current);
      // infowindow.open(mapRef.current, marker);
    }


  });

  const handleMapClick = useCallback((evt: google.maps.MapMouseEvent) => {
    console.log('loc ', evt.latLng?.lat(), evt.latLng?.lng());
  }, []);


  console.log();

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
