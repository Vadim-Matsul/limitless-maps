import config from '../../helpers/const';
import testBUndle from '../../z_test';
import Labels from './Labels';

jest.mock('../loader', () => () => <div data-testid='loader' />);
jest.mock('../error', () => () => <div data-testid='error' />);
jest.mock('../list', () => () => <div data-testid='list' />);

const {
  render,
  screen,
  UserEvent,
  creators: { createMarker },
} = testBUndle;

let mockContext: {};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => (mockContext)
}));


describe('Component: Labels', () => {

  it('Корректный рендер при загрузке', () => {
    mockContext = {
      isReady: null,
      markers: []
    };

    render(<Labels className='test-class' />);

    expect(screen.getByTestId('labels')).toHaveAttribute('class', 'test-class');
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('error')).toBeNull();
    expect(screen.queryByTestId('list')).toBeNull();
  });

  it('Корректный рендер при ошибке', () => {
    mockContext = {
      isReady: false,
      markers: []
    };

    render(<Labels className='test-class' />);

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByTestId('list')).toBeNull();
  });

  it('Корректный рендер при завершении загрузки (нет активного маркера)', () => {
    mockContext = {
      isReady: true,
      markers: []
    };

    render(<Labels className='test-class' />);

    expect(screen.queryByTestId('list')).toBeNull();
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByTestId('error')).toBeNull();

    const no_select = screen.getByText(config.list.label.nothing);
    expect(no_select).toBeInTheDocument();
    expect(no_select).toHaveAttribute('class', 'no_select');
  });

  it('Корректный рендер при завершении загрузки (активный маркер)', async () => {
    const marker = createMarker();
    mockContext = {
      isReady: true,
      markers: [marker],
      activeMarker: marker.id,
      storage: {},
    };

    render(<Labels className='test-class' />);

    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByTestId('error')).toBeNull();
    expect(screen.queryByText(config.list.label.nothing)).toBeNull();

    const control = screen.getByText('control_point');
    expect(control).toBeInTheDocument();

    await UserEvent.click(control).then(() => {
      expect(screen.getByPlaceholderText(config.modal.placeholder)).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toBe(2);
    });

  });

});
