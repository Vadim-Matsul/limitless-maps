import type { ShieldProps } from './types';

import config from '../../../helpers/const';

import styles from './Shield.module.css';


const Shield: React.FC<ShieldProps> = ({ text, mapReady }) => {
  const _class = `${styles.shield} ${mapReady ? styles.shield_end : ''}`;
  const isError = text === config.sww;

  const handlePageReload = () => window.location.reload();

  return (
    <div
      className={_class}
      data-testid='shield'
    >
      <span>{text}</span>
      {isError &&
        <span
          className={`material-icons ${styles.reload}`}
          onClick={handlePageReload}
        >
          restart_alt
        </span>
      }
    </div>
  );
};

export default Shield;
