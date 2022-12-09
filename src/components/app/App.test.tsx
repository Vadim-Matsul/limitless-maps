import config from '../../helpers/const';
import testBundle from '../../z_test';
import App from './App';


jest.mock('../labels', () => () => <div data-testid='labels' />);
jest.mock('../marks', () => () => <div data-testid='marks' />);
jest.mock('../map', () => () => { throw new Error(); });

const { screen, render } = testBundle;

describe('Component: App', () => {

  it('Корректная обработка ошибки в приложении', () => {
    render(<App />);

    expect(screen.getByText(config.errorText)).toBeInTheDocument();
    expect(screen.queryByTestId('labels')).toBeNull();
    expect(screen.queryByTestId('marks')).toBeNull();

  });

});


