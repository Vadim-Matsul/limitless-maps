import Empty from '.';
import testBundle from '../../../z_test';

const { render, screen } = testBundle;

describe('Component: Empty', () => {

  it('Корректный рендер', () => {
    render(<Empty emptyText='test empty' />);

    const empty = screen.getByText('test empty');
    expect(empty).toBeInTheDocument();
    expect(empty).toHaveAttribute('class', 'empty');
  });

});