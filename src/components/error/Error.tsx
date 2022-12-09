import React from 'react';

import config from '../../helpers/const';

import style from './Error.module.css';


const Error: React.FC = () => (
  <div
    className={style.error}
    data-testid='error'
  >
    <span>{config.errorText}</span>
  </div>
);

export default Error;
