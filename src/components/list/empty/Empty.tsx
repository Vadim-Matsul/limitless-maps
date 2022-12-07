import type { EmptyProps } from './types';

import style from './Empty.module.css';


const Empty: React.FC<EmptyProps> = ({ emptyText }) => (
  <span className={style.empty}>
    {emptyText}
  </span>
);

export default Empty;
