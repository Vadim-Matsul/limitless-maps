import config from '../../../helpers/const';
import testBundle from '../../../z_test';
import Shield from './Shield';

const { render, screen, UserEvent } = testBundle;


describe('Component: Shield', () => {
  const spyReload = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: spyReload }
    });
  });

  it('корректный рендер без ошибки', () => {
    render(<Shield text='some text' mapReady={false} />);
    expect(screen.getByTestId('shield')).toHaveAttribute('class', 'shield ');
    expect(screen.queryByText(/restart_alt/i)).toBeNull();
  });

  it('корректный рендер с ошибкой', async () => {
    render(<Shield text={config.sww} mapReady={true} />);

    const reload = screen.getByText(/restart_alt/i);
    expect(reload).toBeInTheDocument();
    expect(screen.getByTestId('shield')).toHaveAttribute('class', 'shield shield_end');

    expect(spyReload).not.toBeCalled();
    await UserEvent.click(reload);
    expect(spyReload).toBeCalled();
  });

});
