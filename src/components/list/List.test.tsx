import testBundle from '../../z_test';
import List from './List';


jest.mock('./item', () => () => <div data-testid='item' />);
jest.mock('./empty', () => () => <div data-testid='empty' />);

const {
  render,
  screen,
  creators: { createMarker } } = testBundle;

describe('Component: List', () => {
  const emptyText = 'test empty text';
  const props = {
    onDelete: () => { },
    onEdit: () => { },
    activeMarker: null,
    emptyText,
  };

  it('Корректный рендер на всех страницах - пустой массив итераций', () => {
    render(
      <List
        i_data={[]}
        {...props}
      />
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(screen.queryByTestId('item')).toBeNull();
  });

  it('Корректный рендер на всех страницах - массив итераций', () => {
    const bundle = [createMarker()];

    render(
      <List
        i_data={bundle}
        {...props}
      />
    );
    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('class', 'list');
    expect(screen.getByTestId('item')).toBeInTheDocument();
    expect(screen.queryByTestId('empty')).toBeNull();
  });

  it('Корректный рендер в компоненте Labels', () => {
    render(
      <List
        isMark={false}
        i_data={[]}
        {...props}
      />);
    expect(screen.getByTestId('list')).toHaveAttribute('class', 'list__wrap');
  });

  it('Корректный рендер в компоненте Mark', () => {
    render(
      <List
        i_data={[]}
        {...props}
      />);
    expect(screen.getByTestId('list')).not.toHaveAttribute('class', 'list__wrap')
  });

});
