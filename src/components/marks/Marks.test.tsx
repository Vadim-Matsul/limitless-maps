import testBUndle from '../../z_test';
import Marks from './Marks';

jest.mock('../loader', () => () => <div data-testid='loader' />);
jest.mock('../error', () => () => <div data-testid='error' />);
jest.mock('../list', () => () => <div data-testid='list' />);

const {
  render,
  screen,
} = testBUndle;

let mockContext: {};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => (mockContext)
}));


describe('Component: Marks', () => {

  it('Корректный рендер при ошибке', () => {
    mockContext = {
      isReady: false,
    };

    render(<Marks className='test-class' />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByTestId('list')).toBeNull();
  });

  it('Корректный рендер при завершении загрузки', () => {
    mockContext = {
      isReady: true,
    };

    render(<Marks className='test-class' />);

    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('Корректный рендер при загрузке', () => {
    mockContext = {
      isReady: null,
    };

    render(<Marks className='test-class' />);

    expect(screen.getByTestId('marks')).toHaveAttribute('class', 'test-class marks');
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('error')).toBeNull();
    expect(screen.queryByTestId('list')).toBeNull();
  });

});
