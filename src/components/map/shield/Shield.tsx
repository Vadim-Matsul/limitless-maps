import { config } from '../../../helpers/const';
import styles from './Shield.module.css';
import { ShieldProps } from './types';

const Shield: React.FC<ShieldProps> = (props) => {
  const { text, mapReady, ...rest } = props;
  const _class = `${styles.shield} ${mapReady ? styles.shield_end : ''}`;
  const isError = text === config.sww;

  const handlePageReload = () => window.location.reload();

  return (
    <div
      className={_class}
      {...rest}
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
