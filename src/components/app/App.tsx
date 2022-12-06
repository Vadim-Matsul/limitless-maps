import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

import Map from '../map/Map';

import style from './App.module.css';
import '../../index.css';
import ErrorBoundaries from '../../hoc/ErrorBoundaries';
import Marked from '../marks';
import Labels from '../labels';


const MAP_KEY = process.env.REACT_APP_MAP_KEY;
const libraries = ['places'] as ['places'];

const App: React.FC = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'test',
    googleMapsApiKey: MAP_KEY!,
    libraries,
  });


  return (
    <div className={style.app}>
      {isLoaded
        ? <ErrorBoundaries>
          <Map
            className={style.map}
          />
        </ErrorBoundaries>
        : <h1>Loading...</h1>
      }
      <div className={style.data}>
        <Marked className={style.marks} />
        <Labels className={style.labels} />
      </div>
    </div>
  );
};

export default App;
