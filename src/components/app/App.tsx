import React from 'react';

import ErrorBoundaries from '../../hoc/ErrorBoundaries';
import Labels from '../labels';
import Marks from '../marks';
import Map from '../map';

import style from './App.module.css';
import '../../index.css';


const App: React.FC = () => (
  <ErrorBoundaries>
    <div className={style.app}>
      <Map
        className={style.map}
      />
      <div className={style.data}>
        <Marks className={style.marks} />
        <Labels className={style.labels} />
      </div>
    </div>
  </ErrorBoundaries>
);

export default App;
