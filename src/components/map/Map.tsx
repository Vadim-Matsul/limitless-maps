import { GoogleMap } from '@react-google-maps/api';

import type { MapProps } from './types';

import { mapInitialData, mapOptions } from '../../helpers/const';
import useMapLogic from './useMapLogic';

import Shield from './shield/Shield';


const Map: React.FC<MapProps> = ({ className }) => {

  const {
    isReady,
    shieldText,
    handleLoad,
    handleUnmount,
    handleMapClick,
  } = useMapLogic();

  return (
    <section className={className}>
      <>
        <Shield
          mapReady={isReady}
          text={shieldText}
        />
        <GoogleMap
          mapContainerStyle={mapInitialData.style}
          center={mapInitialData.center}
          onUnmount={handleUnmount}
          onClick={handleMapClick}
          options={mapOptions}
          onLoad={handleLoad}
          zoom={10}
        >
        </GoogleMap>
      </>
    </section>
  );
};

export default Map;
