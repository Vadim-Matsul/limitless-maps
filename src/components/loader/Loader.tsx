import type { LoaderProps } from './types';

import style from './Loader.module.css';


const Loader: React.FC<LoaderProps> = ({ isWhite = true }) => {
  const color: React.CSSProperties = {
    borderColor: `${isWhite ? 'auto' : 'var(--purple)'}`,
  };

  return (
    <div className={style.loader_wrapper}>
      <div className={style.loader}>
        <div style={color} />
        <div style={color} />
      </div>
    </div>
  );
};

export default Loader;
