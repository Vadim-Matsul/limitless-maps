import { EmptyProps } from './types';

import style from './Empty.module.css';

const Empty: React.FC<EmptyProps> = (props) => {
  const { emptyText, isMark } = props;

  return (
    <span className={style.empty} >
      {emptyText}
    </span>
  );
};

export default Empty;