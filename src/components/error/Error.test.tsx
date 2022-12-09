import config from '../../helpers/const';
import testBundle from '../../z_test/testBundle';
import Error from './Error';

const {
  screen,
  render,
} = testBundle;

describe('Component: Error', () => {

  it('Корректный рендер', () => {
    render(<Error />);
    expect(screen.getByTestId('error')).toHaveAttribute('class', 'error');
    expect(screen.getByText(config.errorText)).toBeInTheDocument();
  });

});
