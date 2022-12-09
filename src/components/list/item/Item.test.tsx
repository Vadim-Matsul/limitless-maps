import testBundle from '../../../z_test';
import Item from '.';

const {
  screen,
  render,
  UserEvent,
  fireEvent,
  creators: { createLabel, createMarker },
} = testBundle;

describe('Component: Item', () => {


  it('Корректная функциональность в компоненте Labels', async () => {
    const bundle = createLabel();
    const spyDelete = jest.fn();
    const spyEdit = jest.fn();

    render(
      <Item
        onDelete={spyDelete}
        activeMarker={null}
        onEdit={spyEdit}
        bundle={bundle}
        isMark={false}

      />
    );

    let li, input;

    li = screen.getByRole('listitem');
    input = screen.getByTestId('title');
    const edit = screen.getByText(/edit/i);

    expect(li).toHaveAttribute('class', 'item ');
    expect(input).toHaveAttribute('class', 'title ');
    expect(input).not.toHaveFocus();
    expect(screen.queryByText(/check_circle/i)).not.toBeInTheDocument();


    input = screen.getByTestId('title');
    expect(input).toHaveValue(bundle.title);

    await UserEvent.click(edit);

    input = screen.getByTestId('title');
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('class', 'title title_active');

    const circle = screen.getByText(/check_circle/i);
    expect(circle).toBeInTheDocument();

    await UserEvent.clear(input);
    input = screen.getByTestId('title');
    expect(input).toHaveValue('');

    await UserEvent.click(circle);
    expect(spyEdit).not.toBeCalled();

    input = screen.getByTestId('title');
    expect(input).not.toHaveFocus();

    expect(spyDelete).not.toBeCalled();
    await UserEvent.click(screen.getByText(/delete/i));
    expect(spyDelete).toBeCalled();
  });

  it('Корректная функциональность в компоненте Marks (активный)', async () => {
    const bundle = createMarker();
    const spyDelete = jest.fn();
    const spyEdit = jest.fn();

    render(
      <Item
        activeMarker={bundle.id}
        onCheckClick={() => { }}
        onDelete={spyDelete}
        onEdit={spyEdit}
        bundle={bundle}
        isMark={true}
      />
    );

    let li, input;

    li = screen.getByRole('listitem');
    input = screen.getByTestId('title');
    const edit = screen.getByText(/edit/i);

    expect(li).toHaveAttribute('class', 'item item_check');
    expect(input).toHaveAttribute('class', 'title ');
    expect(input).not.toHaveFocus();
    expect(screen.queryByText(/check_circle/i)).not.toBeInTheDocument();


    input = screen.getByTestId('title');
    expect(input).toHaveValue(bundle.title);

    await UserEvent.click(edit);

    input = screen.getByTestId('title');
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('class', 'title title_active');

    const circle = screen.getByText(/check_circle/i);
    expect(circle).not.toBeUndefined();

    await UserEvent.clear(input);
    input = screen.getByTestId('title');
    expect(input).toHaveValue('');

    await UserEvent.click(circle);
    expect(spyEdit).not.toBeCalled();

    input = screen.getByTestId('title');
    expect(input).not.toHaveFocus();

    expect(spyDelete).not.toBeCalled();
    await UserEvent.click(screen.getByText(/delete/i));
    expect(spyDelete).toBeCalled();
  });

  it('Корректная функциональность в компоненте Marks (неактивный)', async () => {
    const bundle = createMarker();
    const spyCheck = jest.fn();

    render(
      <Item
        activeMarker={null}
        onCheckClick={spyCheck}
        onDelete={() => { }}
        onEdit={() => { }}
        bundle={bundle}
        isMark={true}
      />
    );

    const edit_b = screen.getByText(/edit/i);
    await UserEvent.click(edit_b);

    expect(screen.getByRole('listitem')).toHaveAttribute('class', 'item ');
    const circles = screen.getAllByText(/check_circle/i);
    expect(circles.length).toBe(2);

    expect(spyCheck).not.toBeCalled();
    await UserEvent.click(circles[1]);
    expect(spyCheck).toBeCalled();
  });


});

