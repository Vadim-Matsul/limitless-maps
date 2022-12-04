import { PureComponent, ReactNode } from 'react';
import Error from '../components/error';

type Props = Readonly<Record<'children', ReactNode>>;
type State = Record<'Error', boolean>;

class ErrorBoundaries extends PureComponent<Props, State> {
  public state: State = { Error: false };

  static getDerivedStateFromError(): State {
    return { Error: true };
  };

  render(): ReactNode {
    return this.state.Error
      ? <Error />
      : this.props.children;
  };
}

export default ErrorBoundaries;